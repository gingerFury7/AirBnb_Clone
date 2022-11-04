import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LargeCard from "../components/LargeCard";
import MeduimCard from "../components/MeduimCard";
import SmallCard from "../components/SmallCard";

const Home = ({ exploreData, cardsData }) => {
    return (
        <div className="">
            <Head>
                <title>GingerFury's Airbnb</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <Banner />

            <main className="max-w-7xl mx-auto px-8 sm:px-16">
                <section className="pt-6">
                    <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {exploreData?.map((e, i) => {
                            return (
                                <SmallCard
                                    key={i}
                                    img={e.img}
                                    location={e.location}
                                    distance={e.distance}
                                />
                            );
                        })}
                    </div>
                </section>
                <section>
                    <h2 className="text-4xl font-semibold py-8">Live anywhere</h2>
                    <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 ml-3">
                        {
                            cardsData?.map((e, i) => {
                                return (<MeduimCard key={i} img={e.img} title={e.title} />)
                            })
                        }
                    </div>

                </section>
                <LargeCard
                    img="https://links.papareact.com/4cj"
                    title="The Greatest Outdoors"
                    description="Wishlist curated by Airbnb"
                    buttonTxt="Get Inspired"
                />
            </main>

            <Footer />
        </div>
    );
};

export default Home;

export async function getStaticProps() {
    const https = require("https");
    const agent = new https.Agent({
        rejectUnauthorized: false,
    });
    const exploreData = await fetch("https://jsonkeeper.com/b/AP9B", {
        method: "GET",
        agent,
    }).then((res) => res.json());

    const cardsData = await fetch("https://jsonkeeper.com/b/6UZM", {
        method: "GET",
        agent,
    }).then((res) => res.json())

    return {
        props: {
            exploreData: exploreData,
            cardsData: cardsData
        },
    };
}
