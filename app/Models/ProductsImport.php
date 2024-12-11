<?php

namespace App\Models;

use App\Models\Product;
use App\Models\Category;
use App\Models\Attribute;
use App\Models\AttributeValue;
use App\Models\ProductAttribute;
use App\Models\ProductAttributeValue;
use App\Models\Brand;
use App\Models\ProductStock;
use App\Models\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Illuminate\Support\Str;
use Auth;
use Carbon\Carbon;
use Storage;
use Illuminate\Support\Facades\Log;

//class ProductsImport implements ToModel, WithHeadingRow, WithValidation
class ProductsImport implements ToCollection, WithHeadingRow, WithValidation, ToModel
{
    private $rows = 0;

    public function collection(Collection $rows)
    {
        $canImport = true;
        $user = Auth::user();
        if ($user->user_type == 'seller' && addon_is_activated('seller_subscription')) {
            if ((count($rows) + $user->products()->count()) > $user->shop->product_upload_limit
                || $user->shop->package_invalid_at == null
                || Carbon::now()->diffInDays(Carbon::parse($user->shop->package_invalid_at), false) < 0
            ) {
                $canImport = false;
                flash(translate('Please upgrade your package.'))->warning();
            }
        }

        if ($canImport) {
            foreach ($rows as $row) {

            $product_name = $row['name'];
            
            $ex_categories = str_replace("Default Category/", "", $row['categories']);
            $sort_categories = explode("/", $ex_categories);
            
            $get_main_category = $sort_categories[0];
            $get_main_category_data = Category::where('name','=',"$get_main_category")->first();
            $main_category_id = $get_main_category_data->id;
            
            $get_category = end($sort_categories);
            $get_category_data = Category::where('name','=',"$get_category")->first();
            $category_id  = $get_category_data->id;
            
            $get_sku = $row['sku'];
            $product_name = $row['name'];
            $product_description = strval($row['description']);
            
            $dom = new \DOMDocument();
            libxml_use_internal_errors(true);
            $dom->loadHTML($product_description);
            libxml_clear_errors();
    
            $xpath = new \DOMXPath($dom);
            $warrantyNode = $xpath->query("//tr[td[text()='Standard Warranty']]");
    
            $warrantyText = '';
            $warrantyCheck = 0;
    
            if ($warrantyNode->length > 0) {
                $valueNode = $warrantyNode->item(0)->getElementsByTagName('td')->item(1);
                if ($valueNode) {
                    $warrantyText = trim($valueNode->textContent);
                }
            }
    
            if (strlen($warrantyText) > 0) {
                $warrantyCheck = 1;
            }
            
            $product_short_description = $row['short_description'];
            $product_weight = number_format($row['weight'], 2) . 'LBS';
            $product_tax = $row['tax_class_name']; // LATER WORK
            
            $product_price = $row['price'];
            $dc_price = $row['special_price'];
            $dc_calculate = (($product_price - $dc_price) / $product_price) * 100;
            
            $product_discount_price = number_format($dc_calculate, 2);
            
            $timestamp = time();
            $product_discount_start_date = strtotime($row['special_price_from_date']);
            $product_discount_end_date = strtotime($row['special_price_to_date']);
            
            $slug = $row['url_key'];
            
            $product_attributes = $row['additional_attributes'];
            $get_attributes = explode(",", $product_attributes);
            $attributes = [];
            foreach ($get_attributes as $get_attribute) {
                if (strpos($get_attribute, "=") !== false) {
                    list($key, $value) = explode("=", $get_attribute, 2);
                    $attributes[$key] = $value;
                } else {
                    $attributes[$get_attribute] = null;
                }
            }
            // dd($attributes);
            $manufacturer = $attributes['manufacturer'] ? $attributes['manufacturer'] : '';
            
            if(strlen($manufacturer) > 0)    {
                $get_attr_val = AttributeValue::where('name','=', $manufacturer)->first();
                if($get_attr_val){
                    $attribute_id = $get_attr_val->attribute_id;
                    $attribute_value_id = $get_attr_val->id;
                }else{
                    $get_attr = Attribute::where('name','=','Manufacturer')->first();
                    $attr_val = new AttributeValue;
                    $attr_val->attribute_id = $get_attr->id;
                    $attr_val->name = $manufacturer;
                    $attr_val->save();
                    $attribute_id = $attr_val->attribute_id;
                    $attribute_value_id = $attr_val->id;
                }
            }
            // $attribute_id
            // dd($attribute_id);
            
            $product_brand = 0;
            
            $Brands = Brand::where('name','=',$manufacturer)->first();
            if($Brands){
                $product_brand = $Brands->id;
            }else{
                $brand = new Brand;
                $brand->name = $manufacturer;
                $brand->meta_title = $manufacturer;
                $brand->meta_description = '';
                $brand->slug = preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', $manufacturer));
                $brand->logo = '';
                $brand->save();
                $product_brand = $brand->id;
            }
            
            $condition = $attributes['condition'];
            $taxonomy = $attributes['google_taxonomy'];
            
            if (isset($taxonomy)) {
                $googleTaxonomy = explode(" > ", $taxonomy);
                $g_taxonomy = implode(", ", $googleTaxonomy);
            }
            
            $product_tags = $g_taxonomy ? $g_taxonomy : '';
            
            $stock_quantity = $row['qty'];
            $oute_of_stock_quantity = $row['out_of_stock_qty'];
            $min_quantity = $row['use_config_min_qty'];
            $max_quantity = 0;
            $in_stock = $row['is_in_stock'];
            
            $shop_id = 6;
            
                $productId = Product::create([
                    'shop_id' => $shop_id,
                    'name' => $product_name,
                    'brand_id' => $product_brand,
                    'tags' => $product_tags,
                    'description' => $product_description,
                    'short_description' => $product_short_description,
                    'lowest_price' => $product_price,
                    'highest_price' => $product_price,
                    'discount' => $product_discount_price,
                    'discount_type' => 'percent',
                    'discount_start_date' => $product_discount_start_date,
                    'discount_end_date' => $product_discount_end_date,
                    'stock' => $in_stock,
                    'published' => 1,
                    'unit' => $product_weight,
                    'min_qty' => 1,
                    'max_qty' => 0,
                    'has_warranty' => $warrantyCheck,
                    'standard_delivery_time' => 72,
                    'express_delivery_time' => 168,
                    'weight' => $row['weight'],
                    'meta_title' => $product_name,
                    'meta_description' => $product_short_description,
                    'slug' => preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', strtolower($slug))),
                    'main_category' => $main_category_id,
                ]);
                ProductCategory::create([
                    'product_id' => $productId->id,
                    'category_id' => $category_id,
                ]);
                ProductVariation::create([
                    'product_id' => $productId->id,
                    'stock' => $in_stock,
                    'sku' => $get_sku,
                    'price' => $product_price,
                    'current_stock' => $stock_quantity
                ]);
                if(strlen($manufacturer) > 0){
                    $p_attribute = new ProductAttribute;
                    $p_attribute->product_id = $productId->id;
                    $p_attribute->attribute_id = $attribute_id;
                    $p_attribute->save();

                    $p_attribute_v = new ProductAttributeValue;
                    $p_attribute_v->product_id = $productId->id;
                    $p_attribute_v->attribute_id = $attribute_id;
                    $p_attribute_v->attribute_value_id = $attribute_value_id;
                    $p_attribute_v->save();
                }
            }

            flash(translate('Products imported successfully'))->success();
        }
    }

    public function model(array $row)
    {
        ++$this->rows;
    }

    public function getRowCount(): int
    {
        return $this->rows;
    }

    public function rules(): array
    {
        return [
            // Can also use callback validation rules
            'price' => function ($attribute, $value, $onFailure) {
                if (!is_numeric($value)) {
                    $onFailure('Unit price is not numeric');
                }
            }
        ];
    }

    public function downloadThumbnail($url)
    {
        try {
            $upload = new Upload;
            $upload->external_link = $url;
            $upload->type = 'image';
            $upload->save();

            return $upload->id;
        } catch (\Exception $e) {
        }
        return null;
    }

    public function downloadGalleryImages($urls)
    {
        $data = array();
        foreach (explode(',', str_replace(' ', '', $urls)) as $url) {
            $data[] = $this->downloadThumbnail($url);
        }
        return implode(',', $data);
    }
}
