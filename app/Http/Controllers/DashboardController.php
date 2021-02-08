<?php
namespace App\Http\Controllers;
use App\Models\Kategori;
use App\Models\Soal;
use App\Models\Siswa;
use App\Models\Nilai;
use App\Models\Kontak;
use Inertia\Inertia;
use DB;
use Carbon\Carbon;
class DashboardController extends Controller
{
    public function index()
    {
        $data = [
            ['nilai'=> '0-10', 'jumlah'=>Nilai::whereBetween('nilai', [0, 10])->count()],
            ['nilai'=> '11-20', 'jumlah'=>Nilai::whereBetween('nilai', [11, 20])->count()],
            ['nilai'=> '21-30', 'jumlah'=>Nilai::whereBetween('nilai', [21, 30])->count()],
            ['nilai'=> '31-40', 'jumlah'=>Nilai::whereBetween('nilai', [31, 40])->count()],
            ['nilai'=> '41-50', 'jumlah'=>Nilai::whereBetween('nilai', [41, 50])->count()],
            ['nilai'=> '51-60', 'jumlah'=>Nilai::whereBetween('nilai', [51, 60])->count()],
            ['nilai'=> '61-70', 'jumlah'=>Nilai::whereBetween('nilai', [61, 70])->count()],
            ['nilai'=> '71-80', 'jumlah'=>Nilai::whereBetween('nilai', [71, 80])->count()],
            ['nilai'=> '81-90', 'jumlah'=>Nilai::whereBetween('nilai', [81, 90])->count()],
            ['nilai'=> '90-100', 'jumlah'=>Nilai::whereBetween('nilai', [91, 100])->count()],
        ];

        return Inertia::render('Dashboard/Index',[
            'siswa' => Siswa::count(),
            'nilai' => Nilai::count(),
            'soal' => Soal::count(),
            'kontak' => Kontak::count(),
            'data' => $data
        ]);
    }
}
