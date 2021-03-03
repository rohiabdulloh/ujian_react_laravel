<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{

   protected $table = 'siswa';
 
   
   
   public function user(){
      return $this->belongsTo('App\Models\User', 'id_user', 'id');
   }
       
}

