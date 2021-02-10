<?php

namespace App\Exports;

use App\Models\Nilai;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class ExportNilai implements FromArray, ShouldAutoSize
{
    public function array(): array
    {
        $nilai = Nilai::leftJoin('users', 'users.id', '=', 'nilai.id_user')
            ->leftJoin('siswa','siswa.id_user','=','nilai.id_user')
            ->select('siswa.nis', 'siswa.nama_siswa', 'nilai.*')
            ->orderBy('id', 'desc')->get();

        $data = array();
        $data[] = array(
            "NO", 
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
