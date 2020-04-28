const isProd = true;
const version = "Version 0.15 Release Candidate 1";
const Localhost = "http://localhost:7071";
const Prodhost = "https://ipo2020-dev-appservice.azurewebsites.net";
const FunctionKey = "code=RL9gvBjKUqu7L0AL0OZorm/Zt4Jw4JfJFVvynKN93bjFihZBfkaICw==";
const StarDomain = "star.ipo.vote";
const ApiMethod = method => `${isProd ? Prodhost : Localhost}/api/${method}?${FunctionKey}`;

const AppSettings = {
  Version: version,
  FindVoter: ApiMethod("FindVoter"),
  RequestBallot: ApiMethod("RequestBallot"),
  StarDomain: StarDomain,
  GetStarId: `https://${StarDomain}/survey/getstarid`
};

export default AppSettings;
