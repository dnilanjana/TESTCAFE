/* eslint-disable no-unused-vars */
const axios = require('axios');
const https = require('https');
require('https').globalAgent.options.ca = require('ssl-root-cas').create();

/**
 * generates access token
 * @param {client_id} client_id must be a string
 * @param {client_secret} client_secret must be a string
 * @param {grant_type} grant_type must be a string
 * @param {scope} scope must be a string
 * @param {accessTokenurl} accessTokenurl must be a string url
 * @returns Authorization Token
 */
export const generateAccessToken = async (
  clientId: string,
  clientSecret: string,
  grantType: string,
  scope: string,
  accessTokenurl: string,
) => {
  try {
    const postData: any = {
      clientId,
      clientSecret,
      grantType,
      scope,
    };
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const response = await axios({
      method: 'post',
      url: accessTokenurl,
      httpsAgent: agent,
      data:
      Object.keys(postData).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(postData[key])}`).join('&'),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data.access_token;
  } catch (error) {
    return (`token error:' ${error}`);
  }
};
/**
 * API POST Function
 * @param {getAPIUrl} getAPIUrl must be a string url
 * @param {payload} payload must be the body(type can be jason or any other ) of string type
 * @param {accessToken} accessToken must be a string , if needs to be passed in headers
 * @returns the api response or the error
 */
export const postRequest = async (getAPIUrl: string, payload: string, accessToken?: string) => {
  try {
    let headers = null;
    if (accessToken) {
      headers = {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    } else {
      headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    }
    const response = await axios({
      method: 'post',
      url: getAPIUrl,
      data: payload,
      headers,
    });
    if (response.status !== 200) {
      throw new Error('The status is not 200 ok');
    }
    return await response;
  } catch (error) {
    return (`Failed to execute post method Found Error as : ${error}`);
  }
};

/**
 * API GET function
 * @param {getAPIUrl} getAPIUrl must be a string url
 * @param {payload} payload must be the body(type can be jason or any other ) of string type
 * @param {accessToken} accessToken must be a string , if needs to be passed in headers
 * @returns the api response or the
 */
export const getRequest = async (getAPIUrl: string, payload: string, accessToken?: string) => {
  try {
    let headers = null;
    if (accessToken) {
      headers = {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    } else {
      headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    }
    const response = await axios({
      method: 'get',
      url: getAPIUrl,
      data: payload,
      headers,
    });
    if (response.status !== 200) {
      throw new Error('The status is not 200 ok');
    }
    return await response;
  } catch (error) {
    return (`Failed to execute get method Found Error as : ${error}`);
  }
};
