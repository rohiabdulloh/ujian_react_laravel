<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\SoalController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\NilaiController;
use App\Http\Controllers\UserController;

use App\Http\Controllers\HomeController;
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
Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('login', [LoginController::class, 'login'])->name('login.attemp');
Route::post('logout', [LoginController::class, 'logout']);
Route::get('register', [RegisterController::class, 'showRegisterForm'])->name('register');
Route::post('register', [RegisterController::class, 'register'])->name('register.attemp');

//Admin     - hanya apat diakses oleh user level 1 (admin)
Route::group(['middleware' => ['auth','ceklevel:1']], function(){
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
	Route::resource('/kategori', KategoriController::class);
    Route::resource('/soal', SoalController::class);
    Route::resource('/siswa', SiswaController::class);
    Route::resource('/nilai', NilaiController::class);
    
});

//Peserta     - hanya apat diakses oleh user level 0 dan 1
Route::group(['middleware' => ['auth','ceklevel:0,1']], function(){
    Route::get('/', [HomeController::class, 'index'])->name('home');
    Route::get('/profil', [UserController::class, 'profil'])->name('user.profil');
    Route::put('/user/{id}', [UserController::class, 'update'])->name('user.update');
    
});