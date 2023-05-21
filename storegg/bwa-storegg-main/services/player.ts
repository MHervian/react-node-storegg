import axios from 'axios';
import callAPI from '../config/api';
import { CheckoutTypes } from './data-types';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function getFeaturedGame() {
  const URL = 'players/landingpage';

  console.log("dari services/player/getFeaturedGame()");
  console.log(`${ROOT_API}/${API_VERSION}/${URL}`);

  const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
  const axiosResponse = response.data;

  return axiosResponse.data;
}

export async function getDetailVoucher(id: string) {
  const URL = `players/${id}/detail`;

  const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
  const axiosResponse = response.data;
  console.log(axiosResponse.data.payments);

  return axiosResponse.data;
}

export async function getGameCategory() {
  const URL = 'players/category';

  const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
  const axiosResponse = response.data;

  return axiosResponse.data;
}

export async function setCheckout(data: CheckoutTypes) {
  const url = `${ROOT_API}/${API_VERSION}/players/checkout`;

  return callAPI({
    url,
    method: 'POST',
    data,
    token: true,
  });
}

// method buat upload bukti pembayaran
export async function uploadBuktiPembayaran(data: FormData, id: String) {
  const url = `${ROOT_API}/${API_VERSION}/players/${id}/upload-bukti`;

  return callAPI({
    url,
    method: 'PUT',
    data,
    token: true,
  });
}