export default function URL(firstName, lastName, birthDate) {
  const baseUrl = "https://secure.sos.state.or.us/orestar/vr/showVoterSearch.do?lang=eng&source=SOS";
  let url = baseUrl;
  if (firstName) url += "&identifier2=" + firstName;
  if (lastName) url += "&identifier3=" + lastName;
  if (birthDate) url += "&identifier8=" + birthDate;
  return url;
}
