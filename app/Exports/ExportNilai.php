<?php

namespace App\Exports;

use App\Models\Nilai;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class ExportNilai implements FromArray, ShouldAutoSize
{
    protected $id;
    public function __construct($id)
    {
        $this->id = $id; 
    }

    public function array(): array
    {
        $nilai = Nilai::leftJoin('users', 'users.id', '=', 'nilai.id_user')
            ->leftJoin('siswa','siswa.id_user','=','nilai.id_user')
            ->select('siswa.nis', 'siswa.nama_siswa', 'nilai.*');

        if($this->id!=0)   $nilai = $nilai->where('nilai.id_kategori','=',$this->id);
            
        $nilai = $nilai->orderBy('id', 'desc')->get();

        $data = array();
        $data[] = array(
            "NO", 
            "KATEGORI",
            "NIS", 
            "NAMA SISWA", 
            "MULAI",
            "SELESAI",
            "JML. BENAR",
            "NILAI"
        );
        $no = 0;
        foreach($nilai as $list){
        	$no++;
        	$row = array();
        	$row[]            = $no;
            $row[]            = $list->kategori->nama_kategori;
            $row[]            = $list->nis;
        	$row[]            = $list->nama_siswa;
            $row[]            = $list->mulai;
            $row[]            = $list->selesai;
            $row[]            = $list->jml_benar;
            $row[]            = $list->nilai;
           
            $data[] = $row;
        }

        return $data;
    }
}
