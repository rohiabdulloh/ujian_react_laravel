<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Nilai;
use App\Models\Kategori;
use Inertia\Inertia;
use App\Exports\ExportNilai;

use Redirect;
use Excel;

class NilaiController extends Controller
{
    //tampilkan halaman manajemen data
    public function index()
    {
        $nilai = Nilai::leftJoin('users', 'users.id', '=', 'nilai.id_user')
            ->leftJoin('siswa','siswa.id_user','=','nilai.id_user')
            ->select('siswa.nis', 'siswa.nama_siswa', 'nilai.*')
            ->orderBy('id', 'desc')->get();

        return Inertia::render('Nilai/Index', [
            'kategori'=> Kategori::all(),
            'nilai'=> $nilai,
            'id'=>0
        ]);
    }

    //tampilkan halaman data per kategori
    public function show($id)
    {
        $nilai = Nilai::leftJoin('users', 'users.id', '=', 'nilai.id_user')
            ->leftJoin('siswa','siswa.id_user','=','nilai.id_user')
            ->select('siswa.nis', 'siswa.nama_siswa', 'nilai.*')
            ->orderBy('id', 'desc');
        if($id != 0) $nilai = $nilai->where('id_kategori', '=', $id);
        $nilai = $nilai->get();

        return Inertia::render('Nilai/Index', [
            'kategori'=> Kategori::all(),
            'nilai'=> $nilai,
            'id'=> $id
        ]);
    }

    public function export($id){
        $kategori = Kategori::find($id);
        if($kategori !== null) $file = $kategori->nama_kategori;
        else $file = "Semua_Kategori";
        
        $nilai = new ExportNilai($id);
        return Excel::download($nilai, 'Data_Nilai_'.$file.'.xlsx');
    }
}
