//import { useEffect } from 'react';
//import AOS from 'aos';
import Head from 'next/head';
import Navbar from '../components/organisms/Navbar';
import FAQ from '../components/organisms/FAQ';
import Footer from '../components/organisms/Footer';

export default function Faq() {
    return (
        <>
            <Head>
                <title>FAQ - StoreGG</title>
                <meta name="description" content="Frequently Asking Questions StoreGG" />
                <meta property="og:title" content="FAQ - StoreGG" />
                <meta property="og:description" content="Frequently Asking Questions StoreGG" />
                <meta property="og:image" content="https://imageurlkalian" />
                <meta property="og:url" content="https://storegg.com" />
            </Head>
            <Navbar />
            <FAQ />
            <Footer />
        </>
    );
}