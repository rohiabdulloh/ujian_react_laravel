<?php
namespace App\Http\Controllers;
use App\Models\Kategori;
use App\Models\Soal;
use App\Models\Siswa;
use App\Models\Nilai;
use Inertia\Inertia;
use DB;
use Carbon\Carbon;
class DashboardController extends Controller
{
    public function index()
    {
        $data = [
            ['kat'=> 'Kategori 1', 'jumlah'=>13],
            ['kat'=> 'Kategori 2', 'jumlah'=>53],
            ['kat'=> 'Kategori 3', 'jumlah'=>20],
        ];

        return Inertia::render('Dashboard/Index',[
            'siswa' => Siswa::count(),
            'nilai' => Nilai::count(),
            'data' => $data
        ]);
    }
}
