<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kategori;
use App\Models\Soal;
use Inertia\Inertia;

use Redirect;

class SoalController extends Controller
{
    //tampilkan halaman manajemen data
    public function index()
    {
        $soal = Soal::orderBy('id', 'desc')->get();

        return Inertia::render('Soal/Index', [
            'kategori'=> Kategori::all(),
            'soal'=> $soal,
            'id' => 0
        ]);
    }

    //tampilkan halaman data per kategori
    public function show($id)
    {
        $soal = Soal::orderBy('id', 'desc');
        if($id != 0) $soal = $soal->where('id_kategori', '=', $id);
        $soal = $soal->get();

        return Inertia::render('Soal/Index', [
            'kategori'=> Kategori::all(),
            'soal'=> $soal,
            'id' => $id
        ]);
    }

    //Tampilkan halaman tambah data
    public function create()
    {
        return Inertia::render('Soal/Create', [
            'kategori'=> Kategori::all()
        ]);
    }

    //Menyimpan tambah data
    public function store(Request $rq){
        $this->validate($rq,[
            'soal' => 'required',
            'id_kategori' => 'required',
            'pilihan_1' => 'required',
            'pilihan_2' => 'required',
            'pilihan_3' => 'required',
            'pilihan_4' => 'required',
            'pilihan_5' => 'required',
            'kunci' => 'required',
        ]);

    	$soal = new Soal;
    	$soal->soal = $rq->soal;
    	$soal->id_kategori = $rq->id_kategori;
    	$soal->pilihan_1 = $rq->pilihan_1;
    	$soal->pilihan_2 = $rq->pilihan_2;
    	$soal->pilihan_3 = $rq->pilihan_3;
    	$soal->pilihan_4 = $rq->pilihan_4;
    	$soal->pilihan_5 = $rq->pilihan_5;
    	$soal->kunci = $rq->kunci;
    	$soal->save();

    	return Redirect::route('soal.index')
          ->with(['message'=>'Data berhasil ditambahkan']);
    }

    //tampilkan halaman edit data
    public function edit($id){
    	return Inertia::render('Soal/Edit', [
            'soal'=> Soal::find($id),
            'kategori'=> Kategori::all()
    	]);
    }

    //simpan edit data
    public function update(Request $rq, $id){
        $this->validate($rq,[
            'soal' => 'required',
            'id_kategori' => 'required',
            'pilihan_1' => 'required',
            'pilihan_2' => 'required',
            'pilihan_3' => 'required',
            'pilihan_4' => 'required',
            'pilihan_5' => 'required',
            'kunci' => 'required',
        ]);
        
    	$soal = Soal::find($id);
    	$soal->soal = $rq->soal;
    	$soal->id_kategori = $rq->id_kategori;
    	$soal->pilihan_1 = $rq->pilihan_1;
    	$soal->pilihan_2 = $rq->pilihan_2;
    	$soal->pilihan_3 = $rq->pilihan_3;
    	$soal->pilihan_4 = $rq->pilihan_4;
    	$soal->pilihan_5 = $rq->pilihan_5;
    	$soal->kunci = $rq->kunci;
    	$soal->update();

    	return Redirect::route('soal.index')
           ->with(['message'=>'Data berhasil diedit']);
    }

    //Hapus 1 data
    public function destroy($id){
    	$soal = Soal::find($id);
    	$soal->delete();

    	return Redirect::route('soal.index')
           ->with(['message'=>'Data berhasil dihapus']);
    }

    //Hapus data yang dipilih
    public function delete($ids){
        $ids = json_decode($ids, true);
        foreach ($ids as $id) {
            $soal = Soal::find($id);
            $soal->delete();
        }
        
        return Redirect::route('soal.index')
           ->with(['message'=>'Data berhasil dihapus']);
    }

}
