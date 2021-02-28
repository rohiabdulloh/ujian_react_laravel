<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Siswa;
use App\Models\User;
use Inertia\Inertia;
use App\Exports\ExportPeserta;
use Excel;

use Redirect;

class SiswaController extends Controller
{
    //tampilkan halaman manajemen data
    public function index()
    {
        $siswa = Siswa::leftJoin('users', 'users.id', '=', 'siswa.id_user')
            ->where('users.level', '=,', 0)
            ->select('siswa.*', 'users.picture', 'users.email')
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


    public function export(){
        $siswa = new ExportPeserta();
        return Excel::download($siswa, 'Data_Peserta.xlsx');
    }

}
