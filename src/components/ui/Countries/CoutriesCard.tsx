import { CountryResults, ProfileScores } from "@/types";
import { useEffect, useState } from "react";
import CountryCanvas from "./CountryCanvas";
import CountryMatches from "./CountryMatches";
import CountryEl from "./CountryEl";
interface FitStatus {
  label: string;
  status: "good" | "warning" | "bad";
}

interface CountryPreview {
  id: string;
  flag: string;
  name: string;
  region: string;
  match: number;
  fits: FitStatus[];
}


export default function CountriesCard({ profile }: { profile: ProfileScores }) {
  const [activeCountry, setActiveCountry] = useState<number | null>(null);
  const [country, setCountry] = useState<CountryResults | null>(null);
  useEffect(()=>{
    if(!activeCountry) setCountry(null);
    setCountry(profile.countries?.filter((item)=>item.id===activeCountry)[0])
  }, [activeCountry])
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6 pt-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Країни</h2>
        </div>
        <div className="space-y-8">
          <CountryMatches
            activeCountry={activeCountry}
            setActiveCountry={setActiveCountry}
            countries={profile.countries.sort((a, b)=>b.percent - a.percent)}
          />
          <CountryCanvas
            country={country}
            countries={profile.countries}
            activeCountryId={activeCountry}
            setActiveCountryId={setActiveCountry}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.countries.sort((a, b)=>b.percent - a.percent).map((item)=><CountryEl country={item}/>)}
        </div>
      </div>
    </div>
  );
}
