import React, {useState} from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import Countdown from 'react-countdown';


import Layout from './../../Shared/UjianLayout';
import Modal from './../../Shared/Modal';

export default (props) => { 
    const {flash} = usePage().props;
    const [modal, setModal] = useState({
        open: false,
        isConfirm: false,
        text: '',
        link: ''
    }); 

  const soal = props.soalaktif;
  const kategori = props.kategori;
  const semuasoal = props.soal;
  const nosoal = props.nosoal;
  const nilai = props.nilai;

  const durasi = flash.duarsi!=null ? flash.durasi : nilai.durasi;
  const [waktu, setWaktu] = useState(durasi);

    function handleOpenModal(isConfirm, text, link){
        setModal({
            open: true,
            isConfirm: isConfirm,
            text: text,
            link: link
        });
    }

    function handleCloseModal(){
        setModal((values) => ({
            ...values,
            open: false
        }));
    }

  let pilihan = [];
  if(soal !== null){
    pilihan = [
        {no: 1, huruf:'A', pilihan: soal.pilihan_1},
        {no: 2, huruf:'B', pilihan: soal.pilihan_2},
        {no: 3, huruf:'C', pilihan: soal.pilihan_3},
        {no: 4, huruf:'D', pilihan: soal.pilihan_4},
        {no: 5, huruf:'E', pilihan: soal.pilihan_5},
    ];
  }
  
  return (
    <Layout>
      <Helmet>
        <title>Konfirmasi Ujian</title>
      </Helmet>
      <div className="row">

      <div className="col-md-8">          
        {soal !== null ? (
            <div className="card">
                <div className="card-header">
                    Soal No. {nosoal}

                    <button className="btn btn-primary btn-sm float-right">
                        <Countdown 
                            date={Date.now() + waktu} 
                            renderer={({hours, minutes, seconds, completed}) => {
                                if (completed) {    
                                    return <span>Selesai</span>;
                                } else {
                                    return <span>{hours}:{minutes}:{seconds}</span>;
                                }
                            }}
                            onTick={()=>setWaktu(waktu-1000)}
                            onStop={()=>handleOpenModal(
                                false,
                                "Waktu ujian sudah berakhir",
                                route('ujian.selesai', kategori.id)
                            )}
                        />
                    </button>
                </div>
                <div  style={{height: 360, overflowY: 'auto'}} className="card-body" >
                    <div dangerouslySetInnerHTML={{__html: soal.soal}}></div>
                    <table>
                        <tbody>
                            {pilihan.map((pil)=>(
                                <tr key={pil.no}>
                                    <td width="50" style={{padding: 10}}>
                                        {pil.no == soal.jawaban ? (
                                            <a className="btn btn-primary btn-sm btn-block">{pil.huruf}</a>
                                        ):(
                                            <a href="#" className="btn btn-outline-primary btn-sm btn-block"
                                                onClick={()=>Inertia.post(
                                                    route('ujian.jawab', kategori.id), 
                                                    {
                                                        soal: soal.id, 
                                                        jawab: pil.no, 
                                                        nosoal: nosoal, 
                                                        durasi: waktu, 
                                                        kategori: kategori.id
                                                    }
                                                )}
                                            >{pil.huruf}</a>
                                        )}
                                    </td>
                                    <td style={{padding: 10}} dangerouslySetInnerHTML={{__html: pil.pilihan}}></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer">
                    {nosoal>1 && (
                        <a onClick={()=>Inertia.put(route('ujian', parseInt(nosoal)-1), {durasi:waktu})} className="btn btn-primary btn-sm">
                           <i className="fas fa-angle-left"></i> Sebelumnya
                        </a>    
                    )}

                    {nosoal<semuasoal.length && (
                        <a style={{marginLeft: 10}} onClick={()=>Inertia.put(route('ujian', parseInt(nosoal)+1), {durasi:waktu})} className="btn btn-primary btn-sm">
                           Selanjutnya <i className="fas fa-angle-right"></i> 
                        </a> 
                    )}
                </div>
            </div>
        ) : (
            <div className="card">
                <div className="card-body">Soal tidak ditemukan!</div>
            </div>
        )}
        </div>

        <div className="col-md-4"> 
            <div className="card">
                <div className="card-header" style={{textAlign:"center"}}>
                   <div align="center" className="badge badge-primary"> {props.dikerjakan} dikerjakan</div>
                </div>
                <div  style={{height: 360, overflowY: 'auto'}} className="card-body" >
        
                    {semuasoal.map((so, index)=>(
                        <div key={so.id} width="20%" style={{width: "20%", float:"left"}}>
                            <div style={{padding: 5}}>
                            {index+1 == nosoal && (
                                <a className="btn btn-primary btn-sm btn-block">{index+1}</a>
                            )}

                            {(index+1 != nosoal && so.jawaban==0) && (
                                <a href="#" className="btn btn-outline-primary btn-sm btn-block"
                                    onClick={()=>Inertia.put(route('ujian', index+1), {durasi: waktu})}
                                >{index+1}</a>
                            )}

                            {(index+1 != nosoal && so.jawaban!=0) && (
                                <a href="#" className="btn btn-secondary btn-sm btn-block"
                                onClick={()=>Inertia.put(route('ujian', index+1), {durasi: waktu})}
                                >{index+1}</a>
                            )}      
                            </div>
                        </div>
                    ))}
                           
                </div>
                <div className="card-footer">                
                    <a className="btn btn-primary btn-danger btn-block btn-sm"
                        onClick={()=>handleOpenModal(
                            true,
                            "Setelah mengakhiri ujian tidak dapat kembali ke ujian ini lagi. Yakin akan mengakhiri ujian?",
                            route('ujian.selesai', kategori.id)
                        )} 
                    >
                        Akhiri Ujian
                    </a>    
                </div>
            </div>
        </div>
    </div> 

     
      <Modal
        modal={modal}
        closeModal={handleCloseModal}
      />
    </Layout>
  );
}