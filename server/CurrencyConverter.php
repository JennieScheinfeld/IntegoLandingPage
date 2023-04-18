<?php
class PriceConverter {
  private $currency;
  private $amount;
  private $currency_array = [
    "USD" => [
        "symbol" => "$",
        "position" => "left"
    ], 
    "JPY"=> [
        "symbol" => "¥",
        "position" => "left"
    ], 
    "GBP"=> [
        "symbol" => "£",
        "position" => "left"
    ], 
    "EUR"=> [
        "symbol" => "€",
        "position" => "left"
    ], 
    "CAD" => [
        "symbol" => "$",
        "position" => "left"
    ],
    "AUD"=> [
        "symbol" => "$",
        "position" => "left"
    ], 
    "SEK"=> [
        "symbol" => "kr",
        "position" => "right"
    ], 
    "SGD"=> [
        "symbol" => "$",
        "position" => "left"
    ],
    "MXN"=> [
        "symbol" => "$",
        "position" => "left"
    ],
    "NZD"=> [
        "symbol" => "$",
        "position" => "left"
    ], 
    "DKK"=> [
        "symbol" => "kr.",
        "position" => "right"
    ],
    "BRL"=> [
        "symbol" => "R$",
        "position" => "left"
    ], 
    "NOK"=> [
        "symbol" => "kr",
        "position" => "right"
    ], 
    "HKD"=> [
        "symbol" => "HK$",
        "position" => "left"
    ], 
    "CLP"=> [
        "symbol" => "$",
        "position" => "left"
    ],
    "THB"=> [
        "symbol" => "฿",
        "position" => "left"
    ],
    "ZAR"=> [
        "symbol" => "R",
        "position" => "left"
    ],
    "INR"=> [
        "symbol" => "₹",
        "position" => "left"
    ],
    "COP"=> [
        "symbol" => "$",
        "position" => "left"
    ]
  ];

  public function __construct($amount, $currency) {
    if (!isset($this->currency_array[$currency])) {
      throw new InvalidArgumentException("Unsupported currency: $currency");
    }
    $this->amount = $amount;
    $this->currency = $currency;
  }

  private function convertToCurrency() {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://api.apilayer.com/currency_data/convert?from=USD&to=$this->currency&amount=$this->amount");
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
     "apikey: 9fKFnx6HumhHeMPYY7FK53jZukREYmSB"]);
    $response = curl_exec($ch);
    if(curl_errno($ch)) {
        echo 'Curl error: '.curl_error($ch);
    }
    $jsonResponse = json_decode($response, true);
    
    $result = $jsonResponse['result'];
    $value = $this->formatNumber($result);
    return $value;

  }

  private function formatNumber($value) {
    if($value < 1000 && fmod($value, 1) != 0) {
        $newValue = intval($value).".99";
        return $newValue;
    }
    if($value < 10000) {
        $lastDigit = substr($value, -1);
        if ($lastDigit > 0) {
          $newValue = $value + 10 - $lastDigit;
          return $newValue;
        }
    } else {
        $lastTwoDigits = substr($value, -2);
        if ($lastTwoDigits > 0) {
          $newValue = $value + 100 - $lastTwoDigits;
        }
        return $newValue;
     }

  }

  public function __toString() {
    $value = $this->convertToCurrency();
    $symbol = $this->currency_array[$this->currency]["symbol"];
    $position = $this->currency_array[$this->currency]["position"];
    if ($position === "right") {
       $stringValue = $value.$symbol;
    } else {
       $stringValue = $symbol.$value;
    }
    return $stringValue;
  }
}

$priceConverter = new PriceConverter(29, "USD");
echo $priceConverter;