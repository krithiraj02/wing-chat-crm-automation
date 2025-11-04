// // cypress/support/helpers.js
// // Simple helper to call Supabase refresh-token endpoint and return access_token

// export function getAuthToken() {
//   const url = "https://cwycbtxbxzccjynpiygg.supabase.co/auth/v1/token?grant_type=refresh_token";
//   const apikey = Cypress.env("SUPABASE_API_KEY");
//   const refreshToken = Cypress.env("REFRESH_TOKEN");

//   if (!apikey || !refreshToken) {
//     throw new Error("SUPABASE_API_KEY and REFRESH_TOKEN must be set in cypress.env.json");
//   }

//   return cy.request({
//     method: "POST",
//     url,
//     headers: {
//       apikey,
//       authorization: `Bearer ${apikey}`,
//       "content-type": "application/json;charset=UTF-8",
//       "x-client-info": "supabase-js-web/2.39.7"
//     },
//     body: { refresh_token: refreshToken },
//     failOnStatusCode: false
//   }).then((res) => {
//     if (res.status !== 200) {
//       throw new Error(`Failed to get token: ${res.status} ${JSON.stringify(res.body)}`);
//     }
//     // Supabase returns { access_token: "...", refresh_token: "...", ... }
//     const token = res.body.access_token || res.body.token || res.body.accessToken;
//     if (!token) throw new Error("access_token not present in token response");
//     return token;
//   });
// }


export function getAuthToken() {
  return cy.request({
    method: "POST",
    url: "https://cwycbtxbxzccjynpiygg.supabase.co/auth/v1/token?grant_type=password",
    headers: {
      apikey: Cypress.env("SUPABASE_API_KEY"),
      authorization: `Bearer ${Cypress.env("SUPABASE_API_KEY")}`,
      "content-type": "application/json",
    },
    body: {
      email: Cypress.env("USER_EMAIL"),
      password: Cypress.env("USER_PASSWORD"),
      gotrue_meta_security: {}
    },
    failOnStatusCode: false
  }).then((resp) => {
    if (resp.status !== 200) {
      throw new Error(
        `❌ Auth failed → ${resp.status} ${JSON.stringify(resp.body)}`
      );
    }

    const token = resp.body?.access_token;
    if (!token) throw new Error("❌ No access_token returned!");

    return token;
  });
}

