<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\SoalController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\NilaiController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\KontakController;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\UjianController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

// Auth     
Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login'])->name('login.attemp');
Route::post('/logout', [LoginController::class, 'logout']);
Route::get('/register', [RegisterController::class, 'showRegisterForm'])->name('register');
Route::post('/register', [RegisterController::class, 'register'])->name('register.attemp');

Route::get('/password/emailform', [ForgotPasswordController::class, 'showEmailForm'])->name('password.emailform');
Route::post('/password/email', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
Route::get('/password/reset', [ResetPasswordController::class, 'showResetForm'])->name('password.resetform');
Route::post('/password/reset', [ResetPasswordController::class, 'reset'])->name('password.reset');

//Admin     - hanya apat diakses oleh user level 1 (admin)
Route::group(['middleware' => ['auth','ceklevel:1']], function(){
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profil', [UserController::class, 'profil'])->name('user.profil');
    Route::put('/user/{id}', [UserController::class, 'update'])->name('user.update');
    
	Route::resource('/kategori', KategoriController::class);
    Route::resource('/soal', SoalController::class);
    Route::resource('/siswa', SiswaController::class);

    Route::get('/nilai/export', [NilaiController::class, 'export'])->name('nilai.export');
    Route::resource('/nilai', NilaiController::class);
    Route::resource('/pesan', KontakController::class);
    
});

//Peserta     - hanya apat diakses oleh user level 0 dan 1
Route::group(['middleware' => ['auth','ceklevel:0,1']], function(){
    Route::get('/', [HomeController::class, 'index']);
    Route::get('/home', [HomeController::class, 'index'])->name('home');
    
    Route::get('/peserta', [HomeController::class, 'peserta'])->name('peserta');
    Route::put('/peserta', [HomeController::class, 'update_peserta'])->name('peserta.update');
    
    Route::get('/password', [HomeController::class, 'password'])->name('password');
    Route::put('/password', [HomeController::class, 'update_password'])->name('password.update');
    
    Route::get('/kontak', [HomeController::class, 'kontak'])->name('kontak');
    Route::post('/kontak', [HomeController::class, 'save_kontak'])->name('kontak.save');
    
    Route::get('/ujian', [UjianController::class, 'kategori'])->name('ujian.kategori');
    Route::get('/ujian/{id}/konfirmasi', [UjianController::class, 'konfirmasi'])->name('ujian.konfirmasi');

    Route::post('/ujian/{id}/jawab', [UjianController::class, 'jawab'])->name('ujian.jawab');
    Route::put('/ujian/{id}/selesai', [UjianController::class, 'selesai'])->name('ujian.selesai');
    Route::post('/ujian/{id}', [UjianController::class, 'mulai'])->name('ujian.mulai');

    Route::get('/ujian/{page}', [UjianController::class, 'ujian'])->name('ujian');
    Route::put('/ujian/{page}', [UjianController::class, 'halaman'])->name('ujian.halaman');
    Route::get('/ujian/{id}/hasil', [UjianController::class, 'hasil'])->name('ujian.hasil');
});