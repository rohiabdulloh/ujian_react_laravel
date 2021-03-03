<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{

   protected $table = 'kategori';
  
   //relationship one to many dengan tabel soal
   public function soal(){
   	  return $this->hasMany('App\Models\Soal', 'id_kategori', 'id');
   }

   //relationship one to many dengan tabel nilai
   public function nilai(){
      return $this->hasMany('App\Models\Nilai', 'id_kategori', 'id');
   }
}
