<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Siswa;
use App\Models\User;
use Inertia\Inertia;

use Redirect;

class SiswaController extends Controller
{
    //tampilkan halaman manajemen data
    public function index()
    {
        $siswa = Siswa::leftJoin('users', 'users.id', '=', 'siswa.id_user')
            ->select('siswa.*', 'users.picture')
            ->orderBy('siswa.id', 'desc')->get();

        return Inertia::render('Siswa/Index', [
        	'siswa'=> $siswa
        ]);
    }

    //Hapus 1 data
    public function destroy($id){
    	$siswa = Siswa::find($id);
    	$siswa->delete();

    	return Redirect::route('siswa.index')
           ->with(['message'=>'Data berhasil dihapus']);
    }

}
