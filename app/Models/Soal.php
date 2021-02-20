<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Soal extends Model
{

   protected $table = 'soal';
  
   //relationship one to many dengan tabel kategori
   public function kategori(){
      return $this->belongsTo('App\Models\Kategori', 'id_kategori', 'id');
   }
}
