<?php

namespace App\Exports;

use App\Models\Siswa;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class ExportPeserta implements FromArray, ShouldAutoSize
{
    
    public function array(): array
    {
        $siswa = Siswa::leftJoin('users', 'users.id', '=', 'siswa.id_user')->get();

        $data = array();
        $data[] = array(
            "NO", 
            "NIS", 
            "NAMA SISWA", 
            "NO. UJIAN",
            "KELAS",
            "JENIS KELAMIN",
            "ALAMAT",
            "ASAL SEKOLAH"
        );
        $no = 0;
        foreach($siswa as $list){
        	$no++;
        	$row = array();
        	$row[]            = $no;
            $row[]            = $list->nis;
        	$row[]            = $list->user->name;
            $row[]            = $list->no_ujian;
            $row[]            = $list->kelas;
            $row[]            = $list->jenis_kelamin;
            $row[]            = $list->alamat;
            $row[]            = $list->asal_sekolah;
           
            $data[] = $row;
        }

        return $data;
    }
}
