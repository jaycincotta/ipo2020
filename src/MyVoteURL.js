export default function MyVoteURL(firstName, lastName, birthYear) {
  const baseUrl = "https://secure.sos.state.or.us/orestar/vr/showVoterSearch.do?lang=eng&source=SOS";
  let url = baseUrl;
  if (firstName) url += "&identifier2=" + firstName;
  if (lastName) url += "&identifier3=" + lastName;
  if (birthYear) url += "&identifier8=" + birthYear;
  return url;
}
