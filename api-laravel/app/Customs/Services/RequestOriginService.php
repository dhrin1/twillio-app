<?php

namespace App\Customs\Services;

use GuzzleHttp\Client;

class RequestOriginService {
    
   /**
    * The function `getIp` in PHP retrieves the client's IP address from various server variables and
    * returns it after validating it against private and reserved IP ranges.
    * 
    * @return The `getIp` function is returning the client's IP address by checking various server
    * variables such as 'HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED',
    * 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', and 'REMOTE_ADDR'. It then
    * validates the IP address to ensure it is not a private or reserved IP address. If
    */
    protected function getIp(){
        foreach (array('HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR') as $key){
            if (array_key_exists($key, $_SERVER) === true){
                foreach (explode(',', $_SERVER[$key]) as $ip){
                    if (filter_var(trim($ip), FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false){
                        return $ip;
                    }
                }
            }
        }
        return request()->ip(); 
    }
    
    /**
     * This PHP function retrieves details about an IP address using an external API.
     * 
     * @return The `details()` function is making a GET request to the
     * "https://api.ipbase.com/v1/json/" endpoint with the IP address obtained from `->getIp()`.
     * It then decodes the response body into a PHP object. If the decoding is successful, it returns
     * the decoded data. If not, it returns `null`.
     */
    public function details()
    {
        $client = new Client();
        $response = $client->get('https://api.ipbase.com/v1/json/' . $this->getIp());
        $data = json_decode($response->getBody());
        if ($data) {
            return $data;
        }
        return null; 
    }
}