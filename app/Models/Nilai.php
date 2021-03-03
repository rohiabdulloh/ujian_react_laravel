<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Nilai extends Model
{

   protected $table = 'nilai';
  
   //relationship one to many dengan tabel kategori
   public function kategori(){
      return $this->belongsTo('App\Models\Kategori', 'id_kategori', 'id');
   }
}
