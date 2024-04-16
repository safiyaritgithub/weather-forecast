import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../loader";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

export const Home = () => {
  const [cities, setCities] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    setTimeout(async () => {
      const response = await axios.get(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${
          page * 20
        }`
      );

      setCities((prev) => {
        return [...prev, ...response.data.results];
      });
      setLoading(false);
    }, 1500);
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedCities = () => {
    if (!sortColumn) return cities;

    return cities.slice().sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  };
  const handleCityLinkClick = (e, cityName) => {
    if (e.button === 1) {
      window.open(`/weather/${cityName}`, "_blank");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center  mt-5">
      <span className="text-xl relative left-6 "><CiSearch /></span>

        <input
          type="text"
          placeholder="Search city..."
          onChange={(e) => setSearch(e.target.value)}
          className="border py-2 pr-2 pl-8 rounded-md  lg:w-[26rem]"
        />
      </div>
      <table className="border max-w-[1200px] mx-auto mt-10">
        <thead className="border">
          <tr className="border">
            <th
              className="border p-2 md:p-3 lg:text-lg"
              onClick={() => handleSort("name")}
            >
              City Name
            </th>
            <th
              className="border p-2 md:p-3 lg:text-lg"
              onClick={() => handleSort("cou_name_en")}
            >
              Country
            </th>
            <th
              className="border p-2 md:p-3 lg:text-lg"
              onClick={() => handleSort("timezone")}
            >
              TimeZone
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedCities()
            .filter((city) => {
              const { name, cou_name_en, timezone } = city;
              return (
                search.toLowerCase() === "" ||
                name.toLowerCase().includes(search) ||
                cou_name_en.toLowerCase().includes(search) ||
                timezone.toLowerCase().includes(search)
              );
            })
            .map((curcity) => {
              const { geoname_id, name, cou_name_en, timezone } = curcity;

              return (
                <tr key={geoname_id} className="border">
                  <td className="border text-[12px] p-1 md:text-[14px] md:p-2 lg:p-2 lg:text-[15px]">
                    <Link
                      to={`/weather/${name}`}
                      onClick={(e) => handleCityLinkClick(e, name)}
                    >
                      {name}
                    </Link>
                  </td>
                  <td className="border text-[12px] p-1 md:text-[14px] md:p-2 lg:p-2  lg:text-[15px]">{cou_name_en}</td>
                  <td className="border text-[12px] p-1 md:text-[14px] md:p-2 lg:p-2  lg:text-[15px]">{timezone}</td>
                </tr>
              );
            })}
        </tbody>
        {loading && <Loader />}
      </table>
    </>
  );
};
