import Image from 'next/image';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { useCallback, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { uploadBuktiPembayaran } from '../../../services/player';

import { getMemberTransactions } from '../../../services/member';
import { JWTPayloadTypes, UserTypes } from '../../../services/data-types';
import { HistoryTransactionTypes } from '../../../services/data-types';

export default function UploadBuktiContent() {
    const [idPlayer, setIdPlayer] = useState("");
    const [minimarket, setMinimarket] = useState("");
    const [order, setOrder] = useState("");
    const [image, setImage] = useState<any>("");
    const [imagePreview, setImagePreview] = useState<any>(null);

    const [transactions, setTransactions] = useState([]);
    const getMemberTransactionAPI = useCallback(async (value) => {
        const response = await getMemberTransactions(value);
        if (response.error) {
            toast.error(response.message);
        } else {
            setTransactions(response.data.data);
            console.log(response.data.data);
        }
    }, []);

    useEffect(() => {
        getMemberTransactionAPI('pending');
        const token = Cookies.get('token');
        console.log("Populate data user");
        if (token) {
            const jwtToken = atob(token);
            const payload: JWTPayloadTypes = jwtDecode(jwtToken);
            const userFromPayload: UserTypes = payload.player;
            setIdPlayer(userFromPayload.id);
        }
    }, []);

    const onSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (minimarket == "" || imagePreview == null || order == "") {
            // tampilkan error
            toast.error('Upload gagal. Cek ulang yang diisi');
        }
        // process
        let data = new FormData();

        data.append("image", image);
        data.append("minimarket", minimarket);
        data.append("order", order);

        console.log("Form Data");
        data.forEach((value, key) => {
            console.log(key, value);
        })

        const result = await uploadBuktiPembayaran(data, idPlayer);
        if (result.error) {
            toast.error(result.message);
        } else {
            toast.success('Upload Berhasil');
        }
    };

    return (
        <main className="main-wrapper">
            <h2>Upload Bukti Pembayaran</h2>
            <p className="mb-20 pb-20">Pilih tempat dan struk transaksi untuk diupload.</p>
            <form action="">
                <div className="col-md-6">
                    <div className="pt-30">
                        <label htmlFor="name" className="form-label text-lg fw-medium color-palette-1 mb-10">
                            Pilih Minimarket
                        </label>
                        <select
                            id="category"
                            name="category"
                            className="form-control rounded-pill text-lg"
                            aria-label="Alfa-indo-payment"
                            value={minimarket}
                            onChange={(event) => {
                                setMinimarket(event.target.value);
                            }}
                        >
                            <option key="none" value="">Pilih struk</option>
                            <option key="Indomaret" value="Indomaret">Indomaret</option>
                            <option key="Alfamart" value="Alfamart">Alfamart</option>
                        </select>
                    </div>
                    <div className="pt-30">
                        <label htmlFor="name" className="form-label text-lg fw-medium color-palette-1 mb-10">
                            Pilih Order Upload Bukti
                        </label>
                        <select
                            id="idTransaction"
                            name="idTransaction"
                            className="form-control rounded-pill text-lg"
                            aria-label="pilih-transaction"
                            value={order}
                            onChange={(event) => {
                                setOrder(event.target.value);
                            }}
                        >
                            <option key="none" value="">Pilih Order ID Transaksi</option>
                            {transactions.map((transaction: HistoryTransactionTypes) => (
                                <option key={`${transaction._id}`} value={`${transaction._id}`}>
                                    {`${transaction._id}`} -
                                    {`${transaction.historyVoucherTopup.gameName}`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="pt-30">
                        <div className="photo d-flex">
                            <div className="image-upload">
                                <label>
                                    {imagePreview ? <img src={imagePreview} style={{ width: "545px", height: "445px" }} alt="upload" /> : <Image src="/icon/upload.svg" width={120} height={120} alt="upload" />}
                                </label>
                                <input
                                    id="avatar"
                                    type="file"
                                    name="avatar"
                                    accept="image/png, image/jpeg"
                                    onChange={(event) => {
                                        const img = event.target.files![0];
                                        setImagePreview(URL.createObjectURL(img));
                                        return setImage(img);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="button-group d-flex flex-column mx-auto pt-30">
                        <button
                            type="button"
                            className="btn btn-primary fw-medium text-lg text-white rounded-pill mb-16"
                            style={{
                                width: "220px"
                            }}
                            onClick={onSubmit}
                        >
                            Upload Struk
                        </button>
                    </div>
                </div>
            </form>
        </main>
    );
}