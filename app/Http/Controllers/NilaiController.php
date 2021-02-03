<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Nilai;
use App\Models\Kategori;
use Inertia\Inertia;

use Redirect;

class NilaiController extends Controller
{
    //tampilkan halaman manajemen data
    public function index()
    {
        $nilai = Nilai::leftJoin('siswa', 'siswa.id', '=', 'nilai.id_siswa')
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
        $nilai = Nilai::leftJoin('siswa', 'siswa.id', '=', 'nilai.id_siswa')
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

}
