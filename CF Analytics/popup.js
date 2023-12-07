const handleFetchData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  return data.result;
};
// const userName = "abdusShohidShakil";
// const userName = "developerhubytchannel";
// const userName = "Mahfuz2411";
const userName = "Selim_Al_Sumon";
// const userName = "tourist";
// const userName = "adamant";
// const userName = "BledDest";
const problemsUrl = `https://codeforces.com/api/user.status?handle=${userName}`;

const userUrl = `https://codeforces.com/api/user.info?handles=${userName}`;

const handleProblems = (problems) => {
  let tags = [];
  let tagsWithDetails = {};
  let solvedProblems = [];
  const unsolvedProblems = [];
  const verdictTypes = {
    totalSubmission: problems.length,
    wa: 0,
    accept: 0,
    tle: 0,
    mle: 0,
    ce: 0,
    others: 0,
  };
  const ratingWiseProblem = {};
  const languages = {};

  problems.map(({ problem, programmingLanguage, verdict }) => {
    if (verdict === "OK") {
      solvedProblems.push({
        problem,
        programmingLanguage,
        verdict,
      });
    } else {
      unsolvedProblems.push({
        problem,
        programmingLanguage,
        verdict,
      });
    }
  });

  solvedProblems = [
    ...new Set(
      solvedProblems.map(({ problem, programmingLanguage, verdict }) =>
        JSON.stringify({
          problem,
          programmingLanguage,
          verdict,
        })
      )
    ),
  ];
  solvedProblems = Array.from(solvedProblems.map((item) => JSON.parse(item)));

  console.log(solvedProblems);
  console.log("=====> " + solvedProblems.length);

  problems = [...solvedProblems, ...unsolvedProblems];
  console.log(problems);

  problems.forEach((item) => {
    // tags = [...tags, ...item.problem.tags];
    let { verdict, problem, programmingLanguage } = item;
    const { contestId, index, name } = problem;

    if (verdict === "OK") {
      verdictTypes.accept++;
      if (programmingLanguage.includes("C11")) programmingLanguage = "C";
      else if (
        programmingLanguage.includes("Clang") ||
        programmingLanguage.includes("C++") ||
        programmingLanguage.includes("G++")
      )
        programmingLanguage = "C++";
      else if (programmingLanguage.includes("C#")) programmingLanguage = "C#";
      else if (programmingLanguage.includes("Go")) programmingLanguage = "Go";
      else if (programmingLanguage.includes("Scala"))
        programmingLanguage = "Scala";
      else if (programmingLanguage.includes("Node.js"))
        programmingLanguage = "Node.js";
      else if (programmingLanguage.includes("Rust"))
        programmingLanguage = "Rust";
      else if (programmingLanguage.includes("Ruby"))
        programmingLanguage = "Ruby";
      else if (programmingLanguage.includes("Python"))
        programmingLanguage = "Python";
      else if (programmingLanguage.includes("Perl"))
        programmingLanguage = "Perl";
      else if (programmingLanguage.includes("PHP")) programmingLanguage = "PHP";
      else if (programmingLanguage.includes("Kotlin"))
        programmingLanguage = "Kotlin";
      else if (programmingLanguage.includes("Haskell"))
        programmingLanguage = "Haskell";
      else if (programmingLanguage.includes("PyPy"))
        programmingLanguage = "PyPy";
      else if (programmingLanguage.includes("Java"))
        programmingLanguage = "Java";
      else if (programmingLanguage.includes("JavaScript"))
        programmingLanguage = "JavaScript";
      else if (programmingLanguage.includes("JavaScript"))
        programmingLanguage = "JavaScript";
      else programmingLanguage = "Others";
      if (!languages[programmingLanguage]) languages[programmingLanguage] = 0;
      languages[programmingLanguage]++;
    }
    if (verdict === "WRONG_ANSWER") verdictTypes.wa++;
    else if (verdict === "TIME_LIMIT_EXCEEDED") verdictTypes.tle++;
    else if (verdict === "MEMORY_LIMIT_EXCEEDED") verdictTypes.mle++;
    else if (verdict === "COMPILATION_ERROR") verdictTypes.ce++;
    else verdictTypes.others++;

    const rating = item.problem.rating;
    if (rating) {
      if (!ratingWiseProblem[rating]) {
        ratingWiseProblem[rating] = {
          accept: 0,
          wa: 0,
          problemsWA: [],
          problemsAccept: [],
        };
      }
      if (verdict === "OK") {
        ratingWiseProblem[rating].problemsAccept.push({
          contestId,
          index,
          name,
        });
        ratingWiseProblem[rating].accept++;
      } else {
        ratingWiseProblem[rating].wa++;
        ratingWiseProblem[rating].problemsWA.push({
          contestId,
          index,
          name,
        });
      }
    }

    item?.problem?.tags?.forEach((singleTag) => {
      if (!tagsWithDetails[singleTag]) {
        tagsWithDetails[singleTag] = {
          problemsWA: [],
          problemsAccept: [],
        };
      }
      if (verdict === "OK") {
        tagsWithDetails[singleTag].problemsAccept.push({
          contestId,
          index,
          name,
        });
      } else {
        tagsWithDetails[singleTag].problemsWA.push({
          contestId,
          index,
          name,
        });
      }
    });
  });
  console.log(tagsWithDetails);
  console.log(languages);

  let x = 0;
  for (let i in languages) {
    x += languages[i];
  }
  console.log(x);
  console.log(problems.length);
  console.log(verdictTypes);

  tags = [...new Set(tags)];

  console.log(tagsWithDetails);
  // console.log(tags);
};

const handleUserData = (user) => {
  console.log(user);
  const { firstName, lastName, titlePhoto, handle } = user;
  const fullName = firstName + " " + lastName;
};

const main = () => {
  handleFetchData(problemsUrl).then((result) => {
    handleProblems(result);
    handleFetchData(userUrl).then((result) => {
      handleUserData(result[0]);
    });
  });
};
main();
