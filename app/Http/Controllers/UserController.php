<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Inertia\Inertia;

use Redirect;

class UserController extends Controller
{
    //tampilkan halaman profil user
    public function profil(){
        //Arahkan user ke halaman yang sesuai levelnya
        $view = Auth::user()->level==1 ? 'User/Profil' : 'Front/Profil';
    	return Inertia::render($view, [
            'user'=> Auth::user()
    	]);
    }

    public function update(Request $rq, $id){
        $this->validate($rq,[
            'name' => 'required',
            'email' => 'required',
            'password1' => 'same:password2',
            'password2' => 'same:password1',
        ]);
        
    	$user = User::find($id);
        $user->name        = $rq->name;
        $user->email       = $rq->email;

        //Ubah password hanya jika ada perubahan (input password tidak kosong)
        if(!empty($rq->password1 or !empty($rq->password2))){
           $user->password = Hash::make($rq->password1); //Enkripsi password dg Hash agar aman
        }

        if($rq->hasFile('picture')){ //upload foto hanya jika ada perubahan foto
            //hapus file foto sebelumnya
            if($user->picture!=null and file_exists(public_path('images/icon/'.$user->picture))){
                unlink(public_path('images/icon/'.$user->picture));
            }
            $image_name = "user-".time().'.'.$rq->picture->extension();  
            $rq->picture->move(public_path('images/icon/'), $image_name);

            $user->picture   = $image_name;
        }

     	$user->update();

    	return Redirect::route('user.profil')
            ->with(['message'=>'Data berhasil diperbarui']);
    }
    
}
