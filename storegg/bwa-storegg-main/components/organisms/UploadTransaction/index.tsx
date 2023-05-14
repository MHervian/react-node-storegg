import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function UploadTransaction() {
    const [pilihan, setPilihan] = useState("");
    const [image, setImage] = useState<any>("");
    const [imagePreview, setImagePreview] = useState<any>(null);

    const onSubmit = async () => {
        console.log(pilihan);
        console.log(imagePreview);
        if (pilihan == "" || imagePreview == null) {
            // tampilkan error
            toast.error('Upload gagal. Cek ulang yang diisi'); 
        } else {
            // lanjut upload
            toast.success('Upload Berhasil');
        }
    };

    return (
        <main className="main-wrapper">
            <h2>Upload Bukti Pembayaran</h2>
            <p className="mb-20 pb-20">Pilih tempat dan struk transaksi untuk diupload.</p>
            <form action="">
                <div className="col-md-6">
                    <div className="mb-20">
                        <select
                            id="category"
                            name="category"
                            className="form-select d-block w-100 rounded-pill text-lg"
                            aria-label="Alfa-indo-payment"
                            value={pilihan}
                            onChange={(event) => {
                                setPilihan(event.target.value);
                            }}
                        >
                            <option key="none" value="">Pilih struk</option>
                            <option key="Indomaret" value="Indomaret">Indomaret</option>
                            <option key="Alfamart" value="Alfamart">Alfamart</option>
                        </select>
                    </div>
                    <div className="mb-20 pb-20">
                        <div>
                            <label>
                                {imagePreview ? <img src={imagePreview} style={{width: "545px", height: "445px"}} alt="upload" /> : <Image src="/icon/upload.svg" width={120} height={120} alt="upload" />}
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
                    <div className="button-group d-flex flex-column mx-auto">
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