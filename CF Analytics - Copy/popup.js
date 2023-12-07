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
  let unsolvedProblems = [];
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
    if (verdict?.toLowerCase() === "ok") {
      solvedProblems.push({
        // name: problem.name,
        problem,
        programmingLanguage,
        verdict,
      });
    } else {
      unsolvedProblems.push({
        // name: problem.name,
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
        })
      )
    ),
  ];
  solvedProblems = Array.from(solvedProblems.map((item) => JSON.parse(item)));

  unsolvedProblems = [
    ...new Set(
      unsolvedProblems.map(({ problem, programmingLanguage, verdict }) =>
        JSON.stringify({
          problem,
        })
      )
    ),
  ];
  unsolvedProblems = Array.from(
    unsolvedProblems.map((item) => JSON.parse(item))
  );

  // console.log(solvedProblems);
  console.log(unsolvedProblems);
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
