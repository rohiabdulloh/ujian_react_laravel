<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kontak;
use Inertia\Inertia;

use Redirect;

class KontakController extends Controller
{
    //tampilkan halaman manajemen data
    public function index()
    {
        $kontak = Kontak::leftJoin('users','users.id','=','kontak.id_user')
            ->select('users.name','users.email', 'kontak.*')
            ->orderBy('kontak.id', 'desc')->get();

        return Inertia::render('Kontak/Index', [
        	'kontak'=> $kontak
        ]);
    }

    //Hapus 1 data
    public function destroy($id){
    	$kontak = Kontak::find($id);
    	$kontak->delete();

    	return Redirect::route('pesan.index')
           ->with(['message'=>'Data berhasil dihapus']);
    }

}
