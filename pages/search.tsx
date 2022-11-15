import { useRouter } from "next/router";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

interface Props {
  searchResults: any;
}

function Search({ searchResults }: Props) {
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;

  const formattedStartDate = format(new Date(String(startDate)), "dd MMMM yy");
  const formattedEndDate = format(new Date(String(endDate)), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  //   console.log(searchResults);

  return (
    <div className="">
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />

      <main className="flex ">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs ">
            300+ stays - {range} - for {noOfGuests} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-500 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More Filters</p>
          </div>

          <div className="flex flex-col">
            {searchResults.map((e: any) => {
              return (
                <InfoCard
                  key={e.img}
                  img={e.img}
                  location={e.location}
                  title={e.title}
                  description={e.description}
                  star={e.star}
                  price={e.price}
                  total={e.total}
                />
              );
            })}
          </div>
        </section>
        <section className="hidden xl:inline-flex xl:min-w-[600px] ">
          <Map searchResults={searchResults}/>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const searchResults = await fetch("https://www.jsonkeeper.com/b/5NPS", {
    method: "GET",
    agent,
  }).then((res) => res.json());

  return { props: { searchResults: searchResults } };
}
