import ChallengeCard from "./ChallengeCard";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
export const ChallengesSection = ({ filter, SearchData }) => {
  const data = useSelector((state) => state);
  const [ChallengeData, setChalleneData] = useState(data);
  const CheckStatus = (data) => {
    const CurrentDate = new Date();
    if (data.StartIn.Month == CurrentDate.getMonth() + 1) {
      if (data.StartIn.Day > CurrentDate.getDate()) {
        return "Upcoming";
      } else if (data.StartIn.Day < CurrentDate.getDate()) {
        if (data.EndIn.Day == CurrentDate.getDate()) {
          return "Active";
        } else if (data.EndIn.Day > CurrentDate.getDate()) {
          return "Active";
        } else if (data.EndIn.Day < CurrentDate.getDate()) {
          return "Past";
        }
      }
    } else if (data.StartIn.Month > CurrentDate.getMonth() + 1) {
      return "Upcoming";
    } else if (data.StartIn.Month < CurrentDate.getMonth() + 1) {
      return "Past";
    }
  };
  const applyFilterHandler = async () => {
    let array = data;
    if (filter[0]) {
      let array3 = [];
      await filter.forEach((element) => {
        let array2;
        if (element.FilterName === "Everything") {
          array3 = data;
        } else if (element.FilterName === "Level") {
          array2 = array.filter((x) => {
            return x.Tag == element.Filter;
          });
          array3 = array2.concat(...array3);
        } else if (element.FilterName === "Status") {
          array2 = array.filter((x) => {
            const tag = CheckStatus(x);
            return tag == element.Filter;
          });
          array3 = array2.concat(...array3);
        }
      });
      let uniqueChars = array3.filter((c, index) => {
        return array3.indexOf(c) === index;
      });
      setChalleneData(uniqueChars);
    } else {
      setChalleneData(data);
    }
  };
  const searchHandler = () => {
    let array;
    const Item = SearchData;
    if (Item != undefined) {
      if (Item === "") {
        setChalleneData(data);
      } else {
        array = data.filter((element) => {
          const itemLength = Item.length;
          const item = element.Title.toUpperCase().slice(0, itemLength);
          return item == Item.toUpperCase();
        });
        setChalleneData(array);
      }
    } else {
      setChalleneData(data);
    }
  };

  useEffect(() => {
    applyFilterHandler();
  }, [filter, data]);
  useEffect(() => {
    searchHandler();
  }, [SearchData]);

  return (
    <div className="Challengesstn">
      {ChallengeData.map((chllg) => {
        return <ChallengeCard data={chllg} key={chllg.id} />;
      })}
      <h4 className="Warning">{ChallengeData[0] ? "" : "No Match Found"}</h4>
    </div>
  );
};
