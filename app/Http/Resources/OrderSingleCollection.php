<?php

namespace App\Http\Resources;

use App\Http\Resources\OrderProductCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Address;
use Illuminate\Support\Facades\Request as FacadeRequest;

class OrderSingleCollection extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {   
        if(!auth('api')->user()){
            $get_user_address = Address::where('ip_address','=',FacadeRequest::ip())->first();

            return [
                'id' => $this->id,
                'code' => $this->code,
                'user' => [
                    'name' => $get_user_address->full_name,
                    'email' => $get_user_address->email,
                    'phone' => $get_user_address->phone,
                    'avatar' => 'None',
                ],
                'shipping_address' => json_decode($this->shipping_address),
                'billing_address' => json_decode($this->billing_address),
                'grand_total' => (double) $this->grand_total,
                'orders' => OrderResource::collection($this->orders),
                'date' => $this->created_at->toFormattedDateString()
            ];
        }
        return [
            'id' => $this->id,
            'code' => $this->code,
            'user' => [
                'name' => $this->user->name,
                'email' => $this->user->email,
                'phone' => $this->user->phone,
                'avatar' => api_asset($this->user->avatar),
            ],
            'shipping_address' => json_decode($this->shipping_address),
            'billing_address' => json_decode($this->billing_address),
            'grand_total' => (double) $this->grand_total,
            'orders' => OrderResource::collection($this->orders),
            'date' => $this->created_at->toFormattedDateString()
        ];
    }
    
    public function with($request)
    {
        return [
            'success' => true,
            'status' => 200
        ];
    }
}