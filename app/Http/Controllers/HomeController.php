<?php

namespace App\Http\Controllers;
use App\Models\Siswa;
use App\Models\User;
use App\Models\Kontak;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Auth;
use Redirect;
class HomeController extends Controller
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
    public function index()
    {
        $siswa = Siswa::where('id_user','=',Auth::user()->id)->first();

        if($siswa == null){
            $siswa = new Siswa;
            $siswa->id_user = Auth::user()->id;
            $siswa->nis = '-';
            $siswa->nama_siswa = '-';
            $siswa->no_ujian = '3510JN-'.time();
            $siswa->kelas = '-';
            $siswa->jenis_kelamin = 'L';
            $siswa->alamat = '-';
            $siswa->asal_sekolah = '-';
            $siswa->save();
        }
        return Inertia::render('Front/Home',[
            'siswa' => $siswa,
            'waktu' => date('d-m-Y H:i:s')
        ]);
    }

    public function peserta()
    {
        $siswa = Siswa::where('id_user','=',Auth::user()->id)->first();
        $user = Auth::user();

        return Inertia::render('Front/Peserta',[
            'siswa' => $siswa,
            'user' => $user
        ]);
    }

    public function update_peserta(Request $rq){
        $this->validate($rq,[
            'nama_siswa' => 'required',
            'nis' => 'required',
            'kelas' => 'required',
            'jenis_kelamin' => 'required',
            'alamat' => 'required',
            'asal_sekolah' => 'required',
        ]);
        
    	$siswa = Siswa::find($rq->id);
        $siswa->nama_siswa      = $rq->nama_siswa;
        $siswa->nis             = $rq->nis;
        $siswa->kelas           = $rq->kelas;
        $siswa->jenis_kelamin   = $rq->jenis_kelamin;
        $siswa->alamat          = $rq->alamat;
        $siswa->asal_sekolah    = $rq->asal_sekolah;
        $siswa->update();

        $user = Auth::user();
        if($rq->hasFile('picture')){ //upload foto hanya jika ada perubahan foto
            //hapus file foto sebelumnya
            if($user->picture!=null  and $user->picture!='user.gif' and file_exists(public_path('images/icon/'.$user->picture))){
                unlink(public_path('images/icon/'.$user->picture));
            }
            $image_name = "user-".time().'.'.$rq->picture->extension();  
            $rq->picture->move(public_path('images/icon/'), $image_name);

            $user->picture   = $image_name;
        }
     	$user->update();

    	return Redirect::route('peserta')
            ->with(['message'=>'Data berhasil diperbarui']);
    }

    public function password()
    {
       $user = Auth::user();

        return Inertia::render('Front/Password',[
            'user' => $user
        ]);
    }

    public function update_password(Request $rq){
        $this->validate($rq,[
            'password' => 'required',
            'password1' => 'same:password2',
            'password2' => 'same:password1',
        ]);
        
    	$user = Auth::user();
        $user->password = Hash::make($rq->password1); //Enkripsi password dg Hash agar aman
     	$user->update();

    	return Redirect::route('password')
            ->with(['message'=>'Data berhasil diperbarui']);
    }

    public function kontak()
    {
       return Inertia::render('Front/Kontak');
    }

    public function save_kontak(Request $rq){
        $this->validate($rq,[
            'pesan' => 'required',
        ]);
        
        $kontak = new Kontak;
        $kontak->id_user = Auth::user()->id;
        $kontak->waktu = date('Y-m-d H:i:s');
        $kontak->pesan = $rq->pesan;
        $kontak->save();

    	return Redirect::back()
            ->with(['message'=>'Pesan berhasil dikirim.']);
    }
}
