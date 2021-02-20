<?php

namespace App\Http\Controllers;
use App\Models\Kategori;
use App\Models\Nilai;
use App\Models\Siswa;
use App\Models\Soal;
use App\Models\Jawaban;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Auth;
use Redirect;
use Response;
use Carbon\Carbon;
class UjianController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function kategori(Request $rq)
    {
        $rq->session()->forget('ujian');
        
        $kategori = Kategori::all();
        $data = [];
        foreach($kategori as $kat){
            $nilai = Nilai::where([
                ['id_user','=',Auth::user()->id],
                ['id_kategori','=',$kat->id],
            ])->first();
            
            if($nilai == null){
                $nilai = new Nilai;
                $nilai->id_user = Auth::user()->id;
                $nilai->durasi = $kat->durasi * 60000;
                $nilai->id_kategori = $kat->id;
                $nilai->jml_benar = 0;
                $nilai->nilai = 0;
                $nilai->save();
            }

            $data[] = [
                'kategori' => $kat,
                'nilai' => $nilai
            ];
        }

        return Inertia::render('Front/UjianKategori',[
            'data' => $data,
        ]);
    }

    public function konfirmasi($id)
    {
        $kategori = Kategori::find($id);
        $user = Auth::user();
        $siswa = Siswa::where('id_user','=',$user->id)->first();
        $nilai = Nilai::where([
            ['id_user','=',$user->id],
            ['id_kategori','=',$id],
        ])->first();

        return Inertia::render('Front/UjianKonfirmasi',[
            'kategori' => $kategori,
            'user' => $user,
            'siswa' => $siswa,
            'nilai' => $nilai
        ]);
    }

    public function mulai(Request $rq, $id){
        $rq->session()->put('ujian', $id);

        $nilai = Nilai::where([
            ['id_user','=',Auth::user()->id],
            ['id_kategori','=',$id],
        ])->first();
        $nilai->mulai = Carbon::now();
        $nilai->update();

        $soal = Soal::where('id_kategori', '=', $id)->get();

        $urut = 1;
        foreach($soal as $s){
            $jmljawaban = Jawaban::where([
                ['id_user', '=', Auth::user()->id],
                ['id_soal', '=', $s->id]
            ])->count();

            if($jmljawaban == 0){
                $jawaban = new Jawaban;
                $jawaban->id_user = Auth::user()->id;
                $jawaban->id_soal = $s->id;
                $jawaban->urut = $urut;
                $jawaban->jawaban = 0;
                $jawaban->hasil = 0;
                $jawaban->save();

                $urut++;
            }
        }

        return Redirect::route('ujian', 1);
    }

    public function ujian(Request $rq, $page){
        $ujian = $rq->session()->get('ujian');

        if($ujian == null){
            return Redirect::route('ujian.kategori');
        }else{
           $kategori = Kategori::find($ujian);
           $qsoal = Jawaban::leftJoin('soal', 'jawaban.id_soal', '=', 'soal.id')
             ->where([
                 ['soal.id_kategori','=', $ujian],
                 ['jawaban.id_user', '=', Auth::user()->id]
             ])
             ->select('soal.*', 'jawaban.jawaban');
            
            $qjawaban = $qsoal;

            $semuasoal = $qsoal->get();
            $soalaktif = $qsoal->where('jawaban.urut','=',$page)->first();
            $dikerjakan = $qsoal->where('jawaban.jawaban','!=',0)->count();

            $nilai = Nilai::where([
                ['id_user','=',Auth::user()->id],
                ['id_kategori','=',$ujian],
            ])->first();

            return Inertia::render('Front/Ujian',[
                    'soal' => $semuasoal,
                    'soalaktif' => $soalaktif,
                    'kategori' => $kategori,
                    'nosoal' => $page,
                    'dikerjakan' => $dikerjakan,
                    'nilai' => $nilai
                ]);

        }
    }

    public function update_durasi(Request $rq, $id)
    {
        $nilai = Nilai::find($id);
        $nilai->durasi = $rq->durasi;
        $nilai->update();

        return Response::json(['success'=> true]);
    }

    public function halaman(Request $rq, $page){
        return Redirect::route('ujian', $page)
            ->with(['durasi' => $rq->durasi]);
    }

    
    public function jawab(Request $rq){
        $idsoal = $rq->soal;
        $jawab = $rq->jawab;
        $page = $rq->nosoal;
        $durasi = $rq->durasi;
        $ujian = $rq->kategori;

        $nilai = Nilai::where([
            ['id_user','=',Auth::user()->id],
            ['id_kategori','=',$ujian],
        ])->first();

        $nilai->durasi = $durasi;
        $nilai->update();

        $soal = Soal::find($idsoal);
        $jawaban = Jawaban::where([
            ['id_soal', '=', $idsoal],
            ['id_user', '=', Auth::user()->id]
        ])->first();

        if($soal->kunci == $jawab){
            $hasil = 1;
        }else{
            $hasil = 0;
        }

        if($jawaban !== null){
            $jawaban->jawaban = $jawab;
            $jawaban->hasil = $hasil;
            $jawaban->update();
        }

        return Redirect::back();
    }

    public function selesai(Request $rq, $ujian){
        $qsoal = Jawaban::leftJoin('soal', 'jawaban.id_soal', '=', 'soal.id')
             ->where([
                 ['soal.id_kategori','=', $ujian],
                 ['jawaban.id_user', '=', Auth::user()->id]
             ])
             ->select('soal.*', 'jawaban.hasil');
        $jmlbenar = $qsoal->where('jawaban.hasil','=', 1)->count();

        $jmlsoal = Soal::where('id_kategori','=', $ujian)->count();

        $nilaiujian = round($jmlbenar/$jmlsoal*100, 2);
        $nilai = Nilai::where([
            ['id_user','=',Auth::user()->id],
            ['id_kategori','=',$ujian],
        ])->first();
        
        $nilai->selesai = Carbon::now();
        $nilai->jml_benar = $jmlbenar;
        $nilai->nilai = $nilaiujian;
        $nilai->update();

        $rq->session()->forget('ujian');
        return Redirect::route('ujian.kategori');
    }

    public function hasil($id){
        $kategori = Kategori::find($id);
        $user = Auth::user();
        $siswa = Siswa::where('id_user','=',$user->id)->first();
        $nilai = Nilai::where([
            ['id_user','=',$user->id],
            ['id_kategori','=',$id],
        ])->first();

        return Inertia::render('Front/UjianHasil',[
            'kategori' => $kategori,
            'user' => $user,
            'siswa' => $siswa,
            'nilai' => $nilai
        ]);
    }

}