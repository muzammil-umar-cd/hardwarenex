<template>
    <v-container class="pt-7">
        <v-row>
            <banner
                :loading="false"
                :banner="
                    $store.getters['app/banners']
                        .checkout_page
                "
                class=""
            />
            <v-col xl="12" lg="12" class="mx-auto">
                <v-row>
                    <v-col xl="8" lg="8" sm="12">
                        <div class="mb-4">
                            <div style="background: #f8f8f8;padding: 20px;border-radius: 12px;border: 1px solid #ccc;">
                                <div class="delivery-type" hidden>
                                    <h3 class="opacity-80 mb-3 fs-20">
                                        {{ $t("delivery_type") }}
                                    </h3>
                                    <v-row>
                                        <v-col cols="12" sm="6">
                                            <div class="position-relative mb-3">
                                                <label class="aiz-megabox d-block">
                                                    <input
                                                        type="radio"
                                                        name="delivery_type"
                                                        v-model="selectedDeliveryType"
                                                        value="home_delivery"
                                                        @click="ChooseDeleviryType('home_delivery')"
                                                    />
                                                    <span
                                                        class="d-flex pa-3 aiz-megabox-elem fs-13"
                                                    >
                                                        <span
                                                            class="aiz-rounded-check flex-shrink-0 mt-1"
                                                        ></span>
                                                        <span
                                                            class="flex-grow-1 ps-3 lh-1-5"
                                                        >
                                                            <span
                                                                class="d-block fw-600"
                                                                >{{
                                                                    $t("home_delivery")
                                                                }}</span
                                                            >
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" sm="6" v-if="generalSettings.pickup_point">
                                            <div class="position-relative mb-3">
                                                <label class="aiz-megabox d-block">
                                                    <input
                                                        type="radio"
                                                        name="delivery_type"
                                                        v-model="selectedDeliveryType"
                                                        value="pickup"
                                                        @click="
                                                            checkForPickUp('pickup')
                                                        "
                                                    />
                                                    <span
                                                        class="d-flex pa-3 aiz-megabox-elem fs-13"
                                                    >
                                                        <span
                                                            class="aiz-rounded-check flex-shrink-0 mt-1"
                                                        ></span>
                                                        <span
                                                            class="flex-grow-1 ps-3 lh-1-5"
                                                        >
                                                            <span
                                                                class="d-block fw-600"
                                                                >{{
                                                                    $t("pickup")
                                                                }}</span
                                                            >
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                        </v-col>
                                    </v-row>
                                    <!-- Pick up point ist -->
                                    <div
                                        class="position-relative my-3"
                                        v-if="selectedDeliveryType == 'pickup'"
                                    >
                                        <label
                                            class="aiz-megabox d-block"
                                            v-if="for_pickup"
                                        >
                                            <!-- <v-select
                                label="Select"
                                :items="getPickupPoints"
                            ></v-select>
                            -->
    
                                            <v-autocomplete
                                                v-model="selectedPickupPoint"
                                                :items="getPickupPoints"
                                                :label="$t('select_pickup_point')"
                                                hide-details="auto"
                                                variant="outlined"
                                                item-title="name"
                                                item-value="id"
                                                dense
                                                autocomplete="off"
                                                class=""
                                            >
                                            </v-autocomplete>
                                        </label>
                                    </div>
                                </div>
                                <!-- ========== -->
                                <div v-if="currentUser.id == null">
                                    <h3 class="opacity-80 mb-3 fs-20">
                                        <i class="las la-shipping-fast" style="font-size: 20px;"></i> Shipping & Billing Info
                                    </h3>
                                    <form class="form" v-on:submit.prevent="addNewAddress()" autocomplete="chrome-off">
                                        <div class="row"> 
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="email_address">{{ $t("email_address") }}</label>
                                                    <input 
                                                        :placeholder="$t('email_address')"
                                                        v-model="form.email_address"
                                                        hide-details="auto"
                                                        required
                                                        class="form-control"
                                                        name="email_address"
                                                        id="email_address"
                                                    >
                                                    <p v-for="error of v$.form.email_address.$errors" :key="error.$uid" class="text-red">
                                                        {{error.$message }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="full_name">{{ $t('full_name') }}</label>
                                                    <input 
                                                        :placeholder="$t('full_name')"
                                                        v-model="form.full_name"
                                                        hide-details="auto"
                                                        required
                                                        class="form-control"
                                                        name="full_name"
                                                        id="full_name"
                                                    >
                                                    <p v-for="error of v$.form.full_name.$errors" :key="error.$uid" class="text-red">
                                                        {{error.$message }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="phone_number">{{ $t("phone_number") }}</label>
                                                    <input 
                                                        :placeholder="$t('phone_number')"
                                                        v-model="form.phone"
                                                        hide-details="auto"
                                                        required
                                                        class="form-control"
                                                        name="phone"
                                                        id="phone"
                                                    >
                                                    <p v-for="error of v$.form.phone.$errors" :key="error.$uid" class="text-red">
                                                        {{error.$message }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="address">{{ $t("address") }}</label>
                                                    <input 
                                                        :placeholder="$t('address')"
                                                        v-model="form.address"
                                                        hide-details="auto"
                                                        required
                                                        class="form-control"
                                                        name="address"
                                                        id="address"
                                                    >
                                                    <p v-for="error of v$.form.email_address.$errors" :key="error.$uid" class="text-red">
                                                        {{error.$message }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="country">{{ $t("country") }}</label>
                                                    <input 
                                                        :placeholder="$t('country')"
                                                        v-model="form.country"
                                                        hide-details="auto"
                                                        required
                                                        class="form-control"
                                                        name="country"
                                                        id="country"
                                                    >
                                                    <p v-for="error of v$.form.country.$errors" :key="error.$uid" class="text-red">
                                                        {{error.$message }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="state">{{ $t("state") }}</label>
                                                    <input 
                                                        :placeholder="$t('state')"
                                                        v-model="form.state"
                                                        hide-details="auto"
                                                        required
                                                        class="form-control"
                                                        name="state"
                                                        id="state"
                                                    >
                                                    <p v-for="error of v$.form.state.$errors" :key="error.$uid" class="text-red">
                                                        {{error.$message }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="city">{{ $t("city") }}</label>
                                                    <input 
                                                        :placeholder="$t('city')"
                                                        v-model="form.city"
                                                        hide-details="auto"
                                                        required
                                                        class="form-control"
                                                        name="city"
                                                        id="city"
                                                    >
                                                    <p v-for="error of v$.form.city.$errors" :key="error.$uid" class="text-red">
                                                        {{error.$message }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="postal_code">{{ $t("postal_code") }}</label>
                                                    <input 
                                                        :placeholder="$t('postal_code')"
                                                        v-model="form.postal_code"
                                                        hide-details="auto"
                                                        required
                                                        class="form-control"
                                                        name="postal_code"
                                                        id="postal_code"
                                                    >
                                                    <p v-for="error of v$.form.postal_code.$errors" :key="error.$uid" class="text-red">
                                                        {{error.$message }}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="form-group form-check">
                                            <input type="checkbox" class="form-control form-check-input" name="same_address" id="same_address">
                                            <label class="form-check-label" for="same_address">My billing address is the same as shipping </label>                                            
                                        </div>
                                    </form>
                                </div>
                                <div v-if="currentUser.id == null">
                                    <form class="form" v-on:submit.prevent="addNewAddress()" autocomplete="chrome-off">
                                        <div class="row"> 
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="email_address">{{ $t("email_address") }}</label>
                                                    <input 
                                                        :placeholder="$t('email_address')"
                                                        v-model="form.email_address"
                                                        hide-details="auto"
                                                        required
                                                        class="form-control"
                                                        name="email_address"
                                                        id="email_address"
                                                    >
                                                    <p v-for="error of v$.form.email_address.$errors" :key="error.$uid" class="text-red">
                                                        {{error.$message }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="full_name">{{ $t('full_name') }}</label>
                                                    <input 
                                                        :placeholder="$t('full_name')"
                                                        v-model="form.full_name"
                                                        hide-details="auto"
                                                        required
                                                        class="form-control"
                                                        name="full_name"
                                                        id="full_name"
                                                    >
                                                    <p v-for="error of v$.form.full_name.$errors" :key="error.$uid" class="text-red">
                                                        {{error.$message }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="phone_number">{{ $t("phone_number") }}</label>
                                                    <input 
                                                        :placeholder="$t('phone_number')"
                                                        v-model="form.phone"
                                                        hide-details="auto"
                                                        required
                                                        class="form-control"
                                                        name="phone"
                                                        id="phone"
                                                    >
                                                    <p v-for="error of v$.form.phone.$errors" :key="error.$uid" class="text-red">
                                                        {{error.$message }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="address">{{ $t("address") }}</label>
                                                    <input 
                                                        :placeholder="$t('address')"
                                                        v-model="form.address"
                                                        hide-details="auto"
                                                        required
                                                        class="form-control"
                                                        name="address"
                                                        id="address"
                                                    >
                                                    <p v-for="error of v$.form.email_address.$errors" :key="error.$uid" class="text-red">
                                                        {{error.$message }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="country">{{ $t("country") }}</label>
                                                    <input 
                                                        :placeholder="$t('country')"
                                                        v-model="form.country"
                                                        hide-details="auto"
                                                        required
                                                        class="form-control"
                                                        name="country"
                                                        id="country"
                                                    >
                                                    <p v-for="error of v$.form.country.$errors" :key="error.$uid" class="text-red">
                                                        {{error.$message }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="state">{{ $t("state") }}</label>
                                                    <input 
                                                        :placeholder="$t('state')"
                                                        v-model="form.state"
                                                        hide-details="auto"
                                                        required
                                                        class="form-control"
                                                        name="state"
                                                        id="state"
                                                    >
                                                    <p v-for="error of v$.form.state.$errors" :key="error.$uid" class="text-red">
                                                        {{error.$message }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="city">{{ $t("city") }}</label>
                                                    <input 
                                                        :placeholder="$t('city')"
                                                        v-model="form.city"
                                                        hide-details="auto"
                                                        required
                                                        class="form-control"
                                                        name="city"
                                                        id="city"
                                                    >
                                                    <p v-for="error of v$.form.city.$errors" :key="error.$uid" class="text-red">
                                                        {{error.$message }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="postal_code">{{ $t("postal_code") }}</label>
                                                    <input 
                                                        :placeholder="$t('postal_code')"
                                                        v-model="form.postal_code"
                                                        hide-details="auto"
                                                        required
                                                        class="form-control"
                                                        name="postal_code"
                                                        id="postal_code"
                                                    >
                                                    <p v-for="error of v$.form.postal_code.$errors" :key="error.$uid" class="text-red">
                                                        {{error.$message }}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </form>

                                </div>
                                <div v-if="selectedDeliveryType == 'home_delivery'">
                                    <address-dialog
                                        :show="addDialogShow"
                                        @close="addressDialogClosed"
                                        :old-address="addressSelectedForEdit"
                                    />
                                    <h3 class="opacity-80 mb-3 fs-20">
                                        {{ $t("shipping_address") }}
                                    </h3>
                                    <div class="mb-4">
                                        <div
                                            class="position-relative mb-3"
                                            v-for="address in getAddresses"
                                            :key="address.id"
                                        >
                                            <label class="aiz-megabox d-block">
                                                <input
                                                    type="radio"
                                                    name="checkout_shipping"
                                                    v-model="selectedShippingAddressId"
                                                    :value="address.id"
                                                    :checked="address.default_shipping"
                                                    @change="
                                                        shippingAddressSelected(
                                                            address.id
                                                        )
                                                    "
                                                />
                                                <span
                                                    class="d-flex pa-3 aiz-megabox-elem fs-13 fw-600"
                                                >
                                                    <span
                                                        class="aiz-rounded-check flex-shrink-0 mt-1"
                                                    ></span>
                                                    <span
                                                        class="flex-grow-1 ps-3 opacity-80 lh-1-5"
                                                    >
                                                        <span class="d-block"
                                                            >{{ address.address }},
                                                            {{
                                                                address.postal_code
                                                            }}</span
                                                        >
                                                        <span class="d-block"
                                                            >{{ address.city }},
                                                            {{ address.state }},
                                                            {{ address.country }}</span
                                                        >
                                                        <span>{{ address.phone }}</span>
                                                    </span>
                                                </span>
                                            </label>
                                            <v-btn
                                                class="absolute-right-center me-3"
                                                color="primary"
                                                elevation="0"
                                                small
                                                @click="editAddress(address)"
                                            >
                                                {{ $t("change") }}
                                            </v-btn>
                                        </div>
                                        <v-btn
                                            class="border-dashed border-gray-300 primary--text fs-14"
                                            elevation="0"
                                            block
                                            x-large
                                            @click.stop="addDialogShow = true"
                                        >
                                            <i class="las la-plus"></i>
                                            <span>{{ $t("add_new_address") }}</span>
                                        </v-btn>
                                    </div>
                                    <h3 class="opacity-80 mb-3 fs-20">
                                        {{ $t("billing_address") }}
                                    </h3>
                                    <div class="mb-4">
                                        <div
                                            class="position-relative mb-3"
                                            v-for="address in getAddresses"
                                            :key="address.id"
                                        >
                                            <label class="aiz-megabox d-block">
                                                <input
                                                    type="radio"
                                                    name="checkout_billing"
                                                    v-model="selectedBillingAddressId"
                                                    :value="address.id"
                                                    :checked="address.default_billing"
                                                />
                                                <span
                                                    class="d-flex pa-3 aiz-megabox-elem fs-13 fw-600"
                                                >
                                                    <span
                                                        class="aiz-rounded-check flex-shrink-0 mt-1"
                                                    ></span>
                                                    <span
                                                        class="flex-grow-1 ps-3 opacity-80 lh-1-5"
                                                    >
                                                        <span class="d-block"
                                                            >{{ address.address }},
                                                            {{
                                                                address.postal_code
                                                            }}</span
                                                        >
                                                        <span class="d-block"
                                                            >{{ address.city }},
                                                            {{ address.state }},
                                                            {{ address.country }}</span
                                                        >
                                                        <span>{{ address.phone }}</span>
                                                    </span>
                                                </span>
                                            </label>
                                            <v-btn
                                                class="absolute-right-center me-3"
                                                color="primary"
                                                elevation="0"
                                                small
                                                @click="editAddress(address)"
                                            >
                                                {{ $t("change") }}
                                            </v-btn>
                                        </div>
                                    </div>
                                </div>
                                <!-- ================== -->
                                <div
                                    class="delivery-option"
                                    v-if="selectedDeliveryType == 'home_delivery'"
                                >
                                    <h3 class="opacity-80 mb-3 fs-20">
                                        {{ $t("delivery_option") }}
                                    </h3>
                                    <v-row v-if="selectedDeliveryOption !== ''">
                                        <v-col cols="12" sm="6">
                                            <div class="position-relative mb-3">
                                                <label class="aiz-megabox d-block">
                                                    <input
                                                        type="radio"
                                                        name="delivery_option"
                                                        v-model="selectedDeliveryOption"
                                                        value="standard"
                                                    />
                                                    <span
                                                        class="d-flex pa-3 aiz-megabox-elem fs-13"
                                                    >
                                                        <span
                                                            class="aiz-rounded-check flex-shrink-0 mt-1"
                                                        ></span>
                                                        <span
                                                            class="flex-grow-1 ps-3 lh-1-5"
                                                        >
                                                            <span
                                                                class="d-block fw-600"
                                                                >{{
                                                                    $t(
                                                                        "standard_delivery"
                                                                    )
                                                                }}</span
                                                            >
                                                            <span class="d-block">
                                                                {{
                                                                    $t("delivery_cost")
                                                                }}:
                                                                <span class="fw-600">{{
                                                                    format_price(
                                                                        standardDeliveryCost
                                                                    )
                                                                }}</span>
                                                                <span
                                                                    v-if="
                                                                        is_addon_activated(
                                                                            'multi_vendor'
                                                                        )
                                                                    "
                                                                    >/{{
                                                                        $t("shop")
                                                                    }}</span
                                                                >
                                                            </span>
                                                            <span class="d-block"
                                                                >{{
                                                                    $t(
                                                                        "delivery_timing"
                                                                    )
                                                                }}:
                                                                <span class="fw-600"
                                                                    >{{
                                                                        getStandardTime
                                                                    }}
                                                                    {{
                                                                        $t("days")
                                                                    }}</span
                                                                ></span
                                                            >
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <div class="position-relative mb-3">
                                                <label class="aiz-megabox d-block">
                                                    <input
                                                        type="radio"
                                                        name="delivery_option"
                                                        v-model="selectedDeliveryOption"
                                                        value="express"
                                                    />
                                                    <span
                                                        class="d-flex pa-3 aiz-megabox-elem fs-13"
                                                    >
                                                        <span
                                                            class="aiz-rounded-check flex-shrink-0 mt-1"
                                                        ></span>
                                                        <span
                                                            class="flex-grow-1 ps-3 lh-1-5"
                                                        >
                                                            <span
                                                                class="d-block fw-600"
                                                                >{{
                                                                    $t(
                                                                        "express_delivery"
                                                                    )
                                                                }}</span
                                                            >
                                                            <span class="d-block">
                                                                {{
                                                                    $t("delivery_cost")
                                                                }}:
                                                                <span class="fw-600">{{
                                                                    format_price(
                                                                        expressDeliveryCost
                                                                    )
                                                                }}</span>
                                                                <span
                                                                    v-if="
                                                                        is_addon_activated(
                                                                            'multi_vendor'
                                                                        )
                                                                    "
                                                                    >/{{
                                                                        $t("shop")
                                                                    }}</span
                                                                >
                                                            </span>
                                                            <span class="d-block"
                                                                >{{
                                                                    $t(
                                                                        "delivery_timing"
                                                                    )
                                                                }}:
                                                                <span class="fw-600"
                                                                    >{{
                                                                        getExpressTime
                                                                    }}
                                                                    {{
                                                                        $t("days")
                                                                    }}</span
                                                                ></span
                                                            >
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                        </v-col>
                                    </v-row>
                                    <div
                                        class="border red white--text rounded pa-4"
                                        v-else
                                    >
                                        {{
                                            $t(
                                                "sorry_delivery_is_not_available_in_this_shipping_address"
                                            )
                                        }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-col>
                    <v-col xl="4" lg="4" sm="12" style="border: 1px solid #cccccc;padding: 12px;background-color: #fff;border-radius: 12px;margin-top: 12px;">
                        <div class="mb-4">
                            <h3 class="opacity-80 mb-3 fs-20">
                                {{ $t("order_summary") }}
                            </h3>
                            <div class="mb-4">
                                <v-row>
                                    <v-col cols="12" sm="12">
                                        <div
                                            class="bg-soft-primary text-reset px-6 rounded-sm"
                                            v-if="generalSettings.club_point == 1"
                                        >
                                            <v-row class="mb-2">
                                                <v-col
                                                    cols="8"
                                                    class="fw-500 opacity-80"
                                                    >{{
                                                        $t("total_club_points")
                                                    }}</v-col
                                                >
                                                <v-col cols="4" class="fw-700">{{
                                                    getCartClubPoints
                                                }}</v-col>
                                            </v-row>
                                        </div>
                                        <div
                                            class="border border-gray-200 rounded px-6 py-5 grey lighten-5"
                                        >
                                            <v-row class="">
                                                <v-col
                                                    cols="8"
                                                    class="fw-500 opacity-80"
                                                    >{{ $t("sub_total") }}</v-col
                                                >
                                                <v-col cols="4" class="fw-700">{{
                                                    format_price(
                                                        getCartPrice - getCartTax,
                                                        false
                                                    )
                                                }}</v-col>
                                            </v-row>
                                            <v-row class="mt-0">
                                                <v-col
                                                    cols="8"
                                                    class="fw-500 opacity-80"
                                                    >{{ $t("shipping_charge") }}</v-col
                                                >
                                                <v-col cols="4" class="fw-700">
                                                    {{
                                                        selectedDeliveryType ==
                                                        "home_delivery"
                                                            ? this
                                                                .selectedDeliveryOption ===
                                                            "standard"
                                                                ? format_price(
                                                                    standardDeliveryCost *
                                                                        getCartShops.length
                                                                )
                                                                : format_price(
                                                                    expressDeliveryCost *
                                                                        getCartShops.length
                                                                )
                                                            : 0
                                                    }}
                                                </v-col>
                                            </v-row>
                                            <v-row class="mt-0">
                                                <v-col
                                                    cols="8"
                                                    class="fw-500 opacity-80"
                                                    >{{ $t("tax") }}</v-col
                                                >
                                                <v-col cols="4" class="fw-700">{{
                                                    format_price(getCartTax, false)
                                                }}</v-col>
                                            </v-row>
                                            <v-divider class="mt-3 mb-2"></v-divider>
    
                                            <coupon-form
                                                v-if="
                                                    !is_addon_activated('multi_vendor')
                                                "
                                                for-checkout
                                            />
    
                                            <v-row class="mt-0">
                                                <v-col
                                                    cols="8"
                                                    class="fw-500 opacity-80"
                                                    >{{ $t("discount") }}</v-col
                                                >
                                                <v-col cols="4" class="fw-700">{{
                                                    format_price(getTotalCouponDiscount)
                                                }}</v-col>
                                            </v-row>
                                            <v-divider class="my-3"></v-divider>
                                            <v-row class="fs-16">
                                                <v-col
                                                    cols="8"
                                                    class="fw-500 opacity-80"
                                                    >{{ $t("total_to_pay") }}</v-col
                                                >
                                                <v-col cols="4" class="fw-700">{{
                                                    format_price(totalPrice, false)
                                                }}</v-col>
                                            </v-row>
                                        </div>
                                    </v-col>
                                </v-row>
                            </div>
                        </div>
                        <div class="mb-4" >
                            <h3 class="opacity-80 mb-3 fs-20" hidden>
                                {{ $t("payment_options") }}
                            </h3>
                            <v-row class="mb-3" hidden>
                                <!-- online payment methods -->
                                <v-col
                                    cols="6"
                                    sm="4"
                                    md="3"
                                    v-for="(paymentMethod, i) in paymentMethods"
                                    :key="i"
                                    :class="[paymentMethod.status == 1 ? '' : 'd-none']"
                                >
                                    <label
                                        class="aiz-megabox d-block"
                                        v-if="
                                            getIsDigital &&
                                            paymentMethod.code != 'cash_on_delivery'
                                        "
                                    >
                                        <input
                                            type="radio"
                                            name="checkout_payment_method"
                                            :checked="
                                                selectedPaymentMethod &&
                                                paymentMethod.code ==
                                                    selectedPaymentMethod.code
                                            "
                                            @change="
                                                paymentSelected($event, paymentMethod)
                                            "
                                        />
                                        <span
                                            class="d-block pa-3 aiz-megabox-elem text-center"
                                        >
                                            <img
                                                :src="paymentMethod.img"
                                                class="img-fluid w-100"
                                            />
                                            <span class="fw-700 fs-14">{{
                                                paymentMethod.name
                                            }}</span>
                                        </span>
                                    </label>
                                    <label
                                        class="aiz-megabox d-block"
                                        v-else-if="!getIsDigital"
                                    >
                                        <input
                                            type="radio"
                                            name="checkout_payment_method"
                                            :checked="
                                                selectedPaymentMethod &&
                                                paymentMethod.code ==
                                                    selectedPaymentMethod.code
                                            "
                                            @change="
                                                paymentSelected($event, paymentMethod)
                                            "
                                        />
                                        <span
                                            class="d-block pa-3 aiz-megabox-elem text-center"
                                        >
                                            <img
                                                :src="paymentMethod.img"
                                                class="img-fluid w-100"
                                            />
                                            <span class="fw-700 fs-14">{{
                                                paymentMethod.name
                                            }}</span>
                                        </span>
                                    </label>
                                </v-col>
                                <!-- online payment methods ends -->
    
                                <!-- offline payment methods -->
                                <v-col
                                    cols="6"
                                    sm="4"
                                    md="3"
                                    v-for="(
                                        offlinePaymentMethod, i
                                    ) in offlinePaymentMethods"
                                    :key="offlinePaymentMethod.code"
                                >
                                    <label class="aiz-megabox d-block">
                                        <input
                                            type="radio"
                                            name="wallet_payment_method"
                                            :checked="
                                                selectedPaymentMethod &&
                                                offlinePaymentMethod.code ==
                                                    selectedPaymentMethod.code
                                            "
                                            @change="
                                                paymentSelected(
                                                    $event,
                                                    offlinePaymentMethod
                                                )
                                            "
                                        />
                                        <span
                                            class="d-block pa-3 aiz-megabox-elem text-center"
                                        >
                                            <img
                                                :src="offlinePaymentMethod.img"
                                                class="w-100 h-90px"
                                            />
                                            <span class="fw-700 fs-13">{{
                                                offlinePaymentMethod.name
                                            }}</span>
                                        </span>
                                    </label>
                                </v-col>
                                <!-- offline payment methods loop ends -->
                            </v-row>
    
                            <!-- show authorize net payment method's data -->
                            <div
                                class="my-3"
                            >
                                <h3 class="opacity-80 mb-3 fs-18 text-capitalize">
                                    {{ $t("account_details") }}
                                </h3>
                                <div class="border px-2 py-2">
                                    <!-- show authorize payment method's inputs -->
                                    <v-text-field
                                        variant="plain"
                                        class="my-2 text-field"
                                        :placeholder="
                                            $t('please_enter_valid_card_number')
                                        "
                                        type="text"
                                        v-model="authorizeNet.card_number"
                                        hide-details="auto"
                                        required
                                        outlined
                                    >
                                    </v-text-field>
    
                                    <v-text-field
                                        variant="plain"
                                        class="my-2 text-field"
                                        :placeholder="$t('please_enter_cvv')"
                                        type="text"
                                        v-model="authorizeNet.cvv"
                                        hide-details="auto"
                                        required
                                        outlined
                                    >
                                    </v-text-field>
    
                                    <v-autocomplete
                                        variant="plain"
                                        v-model="authorizeNet.expiration_month"
                                        :items="months"
                                        placeholder="$t('select_month')"
                                        hide-details="auto"
                                        class="mb-3 text-field"
                                        outlined
                                        allow-overflow
                                        dense
                                        required
                                        :label="$t('select_month')"
                                    ></v-autocomplete>
                                    <v-autocomplete
                                        variant="plain"
                                        v-model="authorizeNet.expiration_year"
                                        :items="dateLoop"
                                        placeholder="$t('select_year')"
                                        hide-details="auto"
                                        class="mb-3 text-field"
                                        outlined
                                        allow-overflow
                                        dense
                                        required
                                        :label="$t('select_year')"
                                    ></v-autocomplete>
                                    <!-- show authorize payment method's inputs -->
                                </div>
                            </div>
    
                            <!-- show offline payment method's data -->
                            <div
                                v-if="
                                    selectedPaymentMethod &&
                                    selectedPaymentMethod.code.includes(
                                        'offline_payment'
                                    )
                                "
                                class="my-3"
                            >
                                <h3 class="opacity-80 mb-3 fs-18 text-capitalize">
                                    {{ $t("account_details") }}
                                </h3>
                                <div class="border px-2 py-2">
                                    <div class="text-capitalize my-1">
                                        <span class="font-weight-bold">{{
                                            $t("payment_name")
                                        }}</span>
                                        : {{ selectedPaymentMethod.name }}
                                    </div>
                                    <div class="text-capitalize my-1">
                                        <span class="font-weight-bold">{{
                                            $t("payment_type")
                                        }}</span>
                                        : {{ selectedPaymentMethod.type_show }}
                                    </div>
                                    <div
                                        class="text-capitalize d-flex my-1"
                                        v-if="selectedPaymentMethod.description"
                                    >
                                        <span class="font-weight-bold me-1"
                                            >{{ $t("description") }} :</span
                                        >
                                        <span
                                            v-html="selectedPaymentMethod.description"
                                        ></span>
                                    </div>
                                    <div
                                        class="text-capitalize"
                                        v-if="
                                            selectedPaymentMethod.bank_info.length > 0
                                        "
                                    >
                                        <span class="font-weight-bold"
                                            >{{ $t("bank_info") }}:</span
                                        >
                                        <div
                                            class="border px-2 py-2 mt-2"
                                            v-for="(
                                                bankInfo, i
                                            ) in selectedPaymentMethod.bank_info"
                                            :key="bankInfo.bank_name"
                                        >
                                            <div>
                                                {{ $t("bank_name") }}:
                                                {{ bankInfo.bank_name }}
                                            </div>
                                            <div>
                                                {{ $t("account_name") }}:
                                                {{ bankInfo.account_name }}
                                            </div>
                                            <div>
                                                {{ $t("account_number") }}:
                                                {{ bankInfo.account_number }}
                                            </div>
                                            <div>
                                                {{ $t("routing_number") }}:
                                                {{ bankInfo.routing_number }}
                                            </div>
                                        </div>
                                    </div>
    
                                    <!-- show offline payment method's inputs -->
                                    <div
                                        v-if="
                                            selectedPaymentMethod &&
                                            selectedPaymentMethod.code.includes(
                                                'offline_payment'
                                            )
                                        "
                                    >
                                        <v-text-field
                                            class="my-2 text-field"
                                            :placeholder="$t('transaction_id')"
                                            type="text"
                                            v-model="transactionId"
                                            hide-details="auto"
                                            required
                                            variant="plain"
                                        >
                                        </v-text-field>
                                        <v-file-input
                                            accept="image/*"
                                            :label="$t('add_receipt')"
                                            :placeholder="$t('add_receipt')"
                                            flat
                                            variant="plain"
                                            class="text-field"
                                            prepend-icon=""
                                            clearable
                                            v-model="receipt"
                                        ></v-file-input>
                                    </div>
                                    <!-- show offline payment method's inputs -->
                                </div>
                            </div>
    
                            <template v-if="generalSettings.wallet_system == 1">
                                <div class="mt-4 mb-3 fs-16 fw-700">
                                    {{ $t("or") }},
                                </div>
                                <div
                                    :class="[
                                        'border rounded pa-4 d-flex',
                                        {
                                            'bg-soft-primary border-primary':
                                                selectedPaymentMethod &&
                                                selectedPaymentMethod.code == 'wallet',
                                        },
                                    ]"
                                >
                                    <recharge-dialog
                                        :show="rechargeDialogShow"
                                        from="/checkout"
                                        @close="rechargeDialogClosed"
                                    />
                                    <v-row align="center">
                                        <v-col cols="12" sm="4">
                                            <v-btn
                                                color="red"
                                                elevation="0"
                                                class="px-7 white--text"
                                                @click.stop="walletSelected()"
                                                >{{ $t("pay_with_wallet") }}</v-btn
                                            >
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="4"
                                            class="text-sm-center lh-1-5"
                                        >
                                            <div>
                                                <span
                                                    >{{
                                                        $t("your_wallet_balance")
                                                    }}
                                                    :</span
                                                >
                                                <span class="fw-700 fs-15">{{
                                                    format_price(currentUser.balance)
                                                }}</span>
                                            </div>
                                            <div
                                                v-if="
                                                    selectedPaymentMethod &&
                                                    selectedPaymentMethod.code ==
                                                        'wallet'
                                                "
                                            >
                                                <span
                                                    >{{
                                                        $t("remaining_balance")
                                                    }}
                                                    :</span
                                                >
                                                <span class="fw-700 fs-15">{{
                                                    format_price(
                                                        currentUser.balance - totalPrice
                                                    )
                                                }}</span>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" sm="4" class="text-sm-end">
                                            <v-btn
                                                color="grey lighten-4"
                                                elevation="0"
                                                class="px-7"
                                                @click.stop="rechargeDialogShow = true"
                                                >{{ $t("recharge_wallet") }}</v-btn
                                            >
                                        </v-col>
                                    </v-row>
                                </div>
                            </template>
                        </div>
                    </v-col>
                </v-row>
                <div>
                    <!--  -->
                    <input
                        class="m-2"
                        type="checkbox"
                        id="checkbox"
                        v-model="checkbox"
                    />
                    <!--  -->
                    {{ $t("by_clicking_proceed_i_agree_to") }}
                    {{ $store.getters["app/appName"] }}'s
                    <router-link
                        :to="{
                            name: 'CustomPage',
                            params: { pageSlug: 'terms-and-conditions' },
                        }"
                        class="primary--text fw-500"
                    >
                        {{ $t("terms_and_conditions") }} {{ " , " }}
                    </router-link>
                    <router-link
                        :to="{
                            name: 'CustomPage',
                            params: { pageSlug: 'return-policy' },
                        }"
                        class="primary--text fw-500"
                    >
                        {{ $t("return_policy") }}
                    </router-link>
                    and
                    <router-link
                        :to="{
                            name: 'CustomPage',
                            params: { pageSlug: 'privacy-policy' },
                        }"
                        class="primary--text fw-500"
                    >
                        {{ $t("privacy_policy") }}
                    </router-link>
                </div>
                <div class="my-8">
                    <v-btn
                        elevation="0"
                        color="primary"
                        class=""
                        x-large
                        @click="proceedCheckout"
                        :loading="checkoutLoading"
                        :disabled="checkoutLoading"
                    >
                        <span class="">{{ $t("proceed") }}</span>
                        <span class="border-start border-gray-400 ps-5 ms-5">{{
                            format_price(totalPrice)
                        }}</span>
                    </v-btn>
                </div>
                <Payment ref="makePayment" />
                <FailedDialog ref="failedPayment" />
                <v-overlay :value="checkoutLoading" z-index="99999">
                    <v-progress-circular
                        indeterminate
                        size="64"
                    ></v-progress-circular>
                </v-overlay>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import AddressDialog from "../components/address/AddressDialog.vue";
import CouponForm from "../components/cart/CouponForm.vue";
import RechargeDialog from "../components/wallet/RechargeDialog.vue";
import FailedDialog from "./../components/payment/FailedDialog.vue";
import Payment from "./../components/payment/Payment.vue";

import { useVuelidate } from '@vuelidate/core';
import { required } from "@vuelidate/validators";


export default {
    props: {
        show: { type: Boolean, required: true, default: false },
        oldAddress: { type: Object, default: () => {} }
    },
    head: {
        title: 'Checkout Page',
    },
    name: "AizShopCheckout",
    components: {},
    data() {
        return {
            for_pickup: true,
            selectedPickupPoint: null,
            checkbox: false,
            checkoutLoading: false,
            selectedShippingAddressId: null,
            selectedBillingAddressId: null,
            selectedPaymentMethod: null,
            selectedDeliveryOption: "",
            selectedDeliveryType: "",
            standardDeliveryCost: 0,
            expressDeliveryCost: 0,
            addDialogShow: false,
            addressSelectedForEdit: {},
            rechargeDialogShow: false,
            transactionId: null,
            receipt: null,
            authorizeNet: {
                card_number: "",
                cvv: "",
                expiration_month: "",
                expiration_year: "",
            },
            months: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
            dateloop: [],
            adding: false,
            countriesLoaded: false,
            countries: [],
            filteredStates: [],
            filteredCities: [],
            v$: useVuelidate(),
            form:{
                id: null,
                full_name: "",
                email_address: "",
                address: "",
                postal_code: "",
                country: "",
                state: "",
                city: "",
                phone: "",
            }
        };
    },
    components: {
        AddressDialog,
        RechargeDialog,
        Payment,
        FailedDialog,
        CouponForm,
    },
    validations: {
        form: {
            full_name: { required },
            email_address: { required },
            address: { required },
            postal_code: { required },
            country: { required },
            state: { required },
            city: { required },
            phone: { required },
        }
    },
    watch: {
        oldAddress(newVal, oldVal){
            if(newVal && !this.is_empty_obj(newVal)){
                this.processOldAddress(newVal)        
            }else{
                this.resetData()                
            }
        },
    },
    computed: {
        ...mapGetters("app", [
            "generalSettings",
            "appUrl",
            "paymentMethods",
            "offlinePaymentMethods",
        ]),
        ...mapGetters("address", [
            "getAddresses",
            "getDefaultShippingAddress",
            "getDefaultBillingAddress",
        ]),
        ...mapGetters("cart", [
            "getCartPrice",
            "getTotalCouponDiscount",
            "getCartClubPoints",
            "getCartTax",
            "getCartShops",
            "getStandardTime",
            "getExpressTime",
            "getAllCouponCodes",
            "getSelectedCartIds",
            "checkShopMinOrder",
            "getIsDigital",
            "getPickupPoints",
            "getCartProducts",
        ]),
        ...mapGetters("auth", ["currentUser"]),
        totalPrice() {
            return this.selectedDeliveryType == "home_delivery"
                ? this.selectedDeliveryOption === "standard"
                    ? this.getCartPrice -
                      this.getTotalCouponDiscount +
                      this.standardDeliveryCost * this.getCartShops.length
                    : this.getCartPrice -
                      this.getTotalCouponDiscount +
                      this.expressDeliveryCost * this.getCartShops.length
                : this.getCartPrice - this.getTotalCouponDiscount;
        },
        statePlaceholer(){
            return this.$i18n.t("select_a_state")
        },
        cityPlaceholer(){
            return this.$i18n.t("select_a_city")
        },
        isVisible: {
            get: function(){
                return this.show
            },
            set: function(newValue){}
        },
    },
    created(){
        this.fetchCountries();
    },
    methods: {
        ...mapActions("cart", [
            "resetCoupon",
            "removeMultipleFromCart",
            "fetchCartProducts",
            "fetchPickupPoints",
        ]),
        ...mapActions("address", ["fetchAddresses"]),
        ...mapActions("auth", ["rechargeWallet", "deductFromWallet"]),

        // check for pick up availability

        async checkForPickUp(type) {
            this.getCartProducts.map((product) => {
                if (product.for_pickup == 0) {
                    this.selectedPickupPoint = null;
                    this.for_pickup = false;
                    this.snack({
                        message: `One or more items in the cart are not available for pickup`,
                        color: "red",
                    });
                    return;
                } else {
                    this.for_pickup = true;
                }
            });
            this.selectedDeliveryType = type;
        },

        ChooseDeleviryType(deliveryType){
            this.selectedDeliveryType = deliveryType;
        },

        addressDialogClosed() {
            this.addressSelectedForEdit = {};
            this.addDialogShow = false;
        },

        editAddress(address) {
            this.addressSelectedForEdit = address;
            this.addDialogShow = true;
        },
        rechargeDialogClosed() {
            this.rechargeDialogShow = false;
        },
        paymentSelected(event, paymentMethod) {
            this.selectedPaymentMethod = paymentMethod;
        },
        walletSelected() {
            if (this.currentUser.balance >= this.totalPrice) {
                this.selectedPaymentMethod = {
                    code: "wallet",
                };
            } else {
                this.snack({
                    message: `You don't have enough wallet balance. Please recharge.`,
                    color: "red",
                });
            }
        },
        shippingAddressSelected(address_id) {
            this.getShippingCost(address_id);
        },
        async getShippingCost(address_id) {
            const res = await this.call_api(
                "get",
                `checkout/get-shipping-cost/${address_id}`
            );
            this.selectedDeliveryOption = res.data.success ? "standard" : "";
            this.standardDeliveryCost = parseFloat(
                res.data.standard_delivery_cost
            );
            this.expressDeliveryCost = parseFloat(
                res.data.express_delivery_cost
            );
        },
        async proceedCheckout() {
            if (!this.checkbox) {
                this.snack({
                    message: `You need to agree with our policies`,
                    color: "red",
                });
                return;
            }
            if (this.getSelectedCartIds.length == 0) {
                this.snack({
                    message: `Please select a cart product`,
                    color: "red",
                });
                return;
            }
            if (this.selectedDeliveryType == "home_delivery" && this.getAddresses.length == 0) {
                this.snack({
                    message: `Please add a delivery address`,
                    color: "red",
                });
                return;
            }

            if (
                this.selectedDeliveryType === "home_delivery" &&
                !this.selectedShippingAddressId
            ) {
                this.snack({
                    message: `Please select a delivery address`,
                    color: "red",
                });
                return;
            }
            if (
                this.selectedDeliveryType === "home_delivery" &&
                !this.selectedBillingAddressId
            ) {
                this.snack({
                    message: `Please select a billing address`,
                    color: "red",
                });
                return;
            }

            if (this.selectedDeliveryType === "") {
                this.snack({
                    message: `Please select delivery type at first`,
                    color: "red",
                });
                return;
            }
            if (this.selectedDeliveryType === "pickup" && this.for_pickup == false) {
                this.snack({
                    message: `One or more items in the cart are not available for pickup`,
                    color: "red",
                });
                return;
            }
            if (
                this.selectedDeliveryType === "pickup" &&
                this.selectedPickupPoint == null
            ) {
                this.snack({
                    message: `Please select a pick up point`,
                    color: "red",
                });
                return;
            }
            if (
                this.selectedDeliveryType === "home_delivery" &&
                this.selectedDeliveryOption === ""
            ) {
                this.snack({
                    message: `Sorry, delivery is not available in this shipping address.`,
                    color: "red",
                });
                return;
            }

            if (!this.selectedPaymentMethod) {
                this.snack({
                    message: `Please select a payment method`,
                    color: "red",
                });
                return;
            }

            if (
                this.selectedPaymentMethod &&
                this.selectedPaymentMethod.code.includes("offline_payment") &&
                this.transactionId === null
            ) {
                this.snack({
                    message: this.$i18n.t("please_input_transaction_id"),
                    color: "red",
                });
                return;
            }

            if (!this.checkShopMinOrder.success) {
                this.snack({
                    message: this.checkShopMinOrder.message,
                    color: "red",
                });
                return;
            }

            let formData = new FormData();
            formData.append(
                "shipping_address_id",
                this.selectedShippingAddressId
            );
            formData.append(
                "billing_address_id",
                this.selectedBillingAddressId
            );
            formData.append("payment_type", this.selectedPaymentMethod.code);
            formData.append("delivery_type", this.selectedDeliveryOption);
            formData.append("type_of_delivery", this.selectedDeliveryType);
            formData.append("pickup_point_id", this.selectedPickupPoint);

            let cartIds = this.getSelectedCartIds;
            cartIds.forEach((item, index) => {
                formData.append("cart_item_ids[]", item);
            });

            let coupon_codes = this.getAllCouponCodes;
            coupon_codes.forEach((couponItem, couponItemIndex) => {
                formData.append("coupon_codes[]", couponItem);
            });

            formData.append("transactionId", this.transactionId);
            formData.append("receipt", this.receipt);

            if (this.getCartPrice > 0) {
                this.checkoutLoading = true;
                const res = await this.call_api(
                    "post",
                    "checkout/order/store",
                    formData
                );
                if (res.data.success) {
                    if (res.data.payment_method == "wallet") {
                        this.deductFromWallet(res.data.grand_total);
                    }

                    if (res.data.go_to_payment) {
                        this.$refs.makePayment.pay({
                            requestedFrom: "/checkout",
                            paymentAmount: 0,
                            paymentMethod: res.data.payment_method,
                            paymentType: "cart_payment",
                            userId: this.currentUser.id,
                            oderCode: res.data.order_code,

                            // Authorize Net
                            card_number: this.authorizeNet.card_number,
                            cvv: this.authorizeNet.cvv,
                            expiration_month:
                                this.authorizeNet.expiration_month,
                            expiration_year: this.authorizeNet.expiration_year,
                        });
                    } else {
                        this.$router
                            .push({
                                name: "OrderConfirmed",
                                query: { orderCode: res.data.order_code },
                            })
                            .catch(() => {});
                    }
                    setTimeout(() => {
                        this.resetCoupon();
                        this.removeMultipleFromCart(this.getSelectedCartIds);
                    }, 2000);
                } else {
                    this.snack({
                        message: res.data.message,
                        color: "red",
                    });
                }
                this.checkoutLoading = false;
            }
        },
        ...mapActions("address",[
            "addAddress",
        ]),
        ...mapMutations("address",[
            "setAddresses"
        ]),
        async fetchCountries(){
            if(!this.countriesLoaded){
                const res = await this.call_api("get", "all-countries");
                if(res.data.success){
                    this.countriesLoaded = true
                    this.countries = res.data.data
                }
            }
        },
        async countryChanged(countryid){
            const res = await this.call_api("get", `states/${this.form.country}`);

            if(res.data.success){
                this.filteredStates = res.data.data
                this.form.state = ""
                this.form.city = ""
                this.filteredCities = []
            }else{
                this.snack({
                    message: this.$i18n.t("something_went_wrong"),
                    color: 'red'
                });
            }
        },
        async stateChanged(stateid){
            const res = await this.call_api("get", `cities/${this.form.state}`);
            if(res.data.success){
                this.filteredCities = res.data.data
                this.form.city = ""
            }else{
                this.snack({
                    message: this.$i18n.t("something_went_wrong"),
                    color: 'red'
                });
            }
        },
        async addNewAddress(){
         
            // Prevents form submitting if it has error
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;

            this.adding = true;
            const res = await this.call_api("post", "address/create",this.form);
            if(res.data.success){
                this.addAddress(res.data.data)
                this.snack({ message: res.data.message });
                this.resetData();
                this.closeDialog();                
            }else{
                this.snack({
                    message: this.$i18n.t("something_went_wrong"),
                    color: "red"
                });
            }
            this.adding = false;
        },
        async updateAddress(){
            // Prevents form submitting if it has error
            const isFormCorrect = await this.v$.$validate();
            if (!isFormCorrect) return;


            this.adding = true;
            const res = await this.call_api("post", `address/update`,this.form);
            if(res.data.success){
                this.setAddresses(res.data.data)
                this.snack({ message: res.data.message });
                this.closeDialog();                
            }else{
                this.snack({
                    message: this.$i18n.t("something_went_wrong"),
                    color: "red"
                });
            }
            this.adding = false;
        },
        resetData(){
            this.form.id = null;
            this.full_name = "";
            this.email_address = "";
            this.form.address = "";
            this.form.postal_code = "";
            this.form.country = "";
            this.form.state = "";
            this.form.city = "";
            this.form.phone = "";

            this.v$.form.$reset();
        },
        async processOldAddress(oldVal){
            let oldAddress = { ...oldVal }

            this.form.id = oldAddress.id;
            this.full_name = oldAddress.full_name;
            this.email_address = oldAddress.email_address;
            this.form.address = oldAddress.address;
            this.form.postal_code = oldAddress.postal_code;
            this.form.phone = oldAddress.phone;

            //find selected country and filter states
            let selectedCountry = this.countries.find(country => country.name === oldAddress.country)
            this.form.country = selectedCountry.id;
            await this.countryChanged(selectedCountry.id)

            //find selected state and filter cities
            let selectedState = this.filteredStates.find(state => state.name === oldAddress.state)
            this.form.state = selectedState.id;
            await this.stateChanged(selectedState.id)

            //find selected city
            let selectedCity = this.filteredCities.find(city => city.name === oldAddress.city)
            this.form.city = selectedCity.id;

        },
        closeDialog(){
            this.isVisible = false
            this.$emit('close')
        }
    },
    async created() {
        await this.fetchPickupPoints();
        await this.fetchAddresses();
        this.selectedShippingAddressId = this.getDefaultShippingAddress.id;
        this.selectedBillingAddressId = this.getDefaultBillingAddress.id;
        this.getShippingCost(this.selectedShippingAddressId);

        let dateArray = [];
        let i = new Date().getFullYear();
        for (i; i <= new Date().getFullYear() + 15; i++) {
            dateArray.push(i);
        }
        this.dateLoop = dateArray;
    },
    mounted() {
        if (this.$route.query.cart_payment && this.$route.query.order_code) {
            if (this.$route.query.cart_payment == "success") {
                this.$router
                    .push({
                        name: "OrderConfirmed",
                        query: {
                            orderCode: this.$route.query.order_code,
                        },
                    })
                    .catch(() => {});
                this.snack({ message: "Payment successful!" });
            } else if (this.$route.query.cart_payment == "failed") {
                this.$refs.failedPayment.open({
                    orderCode: this.$route.query.order_code,
                    paymentMethod: this.$route.query.payment_method,
                });
            }
        }
        this.rechargeWallet(this.$route.query.wallet_payment);
        this.fetchCartProducts();
    },
};
</script>
<style>
@media (min-width: 600px) {
    .checkout-banner img {
        height: 281px;
        object-fit: cover;
    }
}
.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.form-group{
    padding: 10px;
}
/* General Grid Setup */
.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
.col {
  flex: 1 0 0%;
  max-width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}

/* Default Columns */
.col-1 { flex: 0 0 8.333%; max-width: 8.333%; }
.col-2 { flex: 0 0 16.667%; max-width: 16.667%; }
.col-3 { flex: 0 0 25%; max-width: 25%; }
.col-4 { flex: 0 0 33.333%; max-width: 33.333%; }
.col-5 { flex: 0 0 41.667%; max-width: 41.667%; }
.col-6 { flex: 0 0 50%; max-width: 50%; }
.col-7 { flex: 0 0 58.333%; max-width: 58.333%; }
.col-8 { flex: 0 0 66.667%; max-width: 66.667%; }
.col-9 { flex: 0 0 75%; max-width: 75%; }
.col-10 { flex: 0 0 83.333%; max-width: 83.333%; }
.col-11 { flex: 0 0 91.667%; max-width: 91.667%; }
.col-12 { flex: 0 0 100%; max-width: 100%; }

/* Breakpoints for Responsive Design */

/* Small devices (≥576px) */
@media (min-width: 576px) {
  .col-sm-1 { flex: 0 0 8.333%; max-width: 8.333%; }
  .col-sm-2 { flex: 0 0 16.667%; max-width: 16.667%; }
  .col-sm-3 { flex: 0 0 25%; max-width: 25%; }
  .col-sm-4 { flex: 0 0 33.333%; max-width: 33.333%; }
  .col-sm-5 { flex: 0 0 41.667%; max-width: 41.667%; }
  .col-sm-6 { flex: 0 0 50%; max-width: 50%; }
  .col-sm-7 { flex: 0 0 58.333%; max-width: 58.333%; }
  .col-sm-8 { flex: 0 0 66.667%; max-width: 66.667%; }
  .col-sm-9 { flex: 0 0 75%; max-width: 75%; }
  .col-sm-10 { flex: 0 0 83.333%; max-width: 83.333%; }
  .col-sm-11 { flex: 0 0 91.667%; max-width: 91.667%; }
  .col-sm-12 { flex: 0 0 100%; max-width: 100%; }
}

/* Medium devices (≥768px) */
@media (min-width: 768px) {
  .col-md-1 { flex: 0 0 8.333%; max-width: 8.333%; }
  .col-md-2 { flex: 0 0 16.667%; max-width: 16.667%; }
  .col-md-3 { flex: 0 0 25%; max-width: 25%; }
  .col-md-4 { flex: 0 0 33.333%; max-width: 33.333%; }
  .col-md-5 { flex: 0 0 41.667%; max-width: 41.667%; }
  .col-md-6 { flex: 0 0 50%; max-width: 50%; }
  .col-md-7 { flex: 0 0 58.333%; max-width: 58.333%; }
  .col-md-8 { flex: 0 0 66.667%; max-width: 66.667%; }
  .col-md-9 { flex: 0 0 75%; max-width: 75%; }
  .col-md-10 { flex: 0 0 83.333%; max-width: 83.333%; }
  .col-md-11 { flex: 0 0 91.667%; max-width: 91.667%; }
  .col-md-12 { flex: 0 0 100%; max-width: 100%; }
}

/* Large devices (≥992px) */
@media (min-width: 992px) {
  .col-lg-1 { flex: 0 0 8.333%; max-width: 8.333%; }
  .col-lg-2 { flex: 0 0 16.667%; max-width: 16.667%; }
  .col-lg-3 { flex: 0 0 25%; max-width: 25%; }
  .col-lg-4 { flex: 0 0 33.333%; max-width: 33.333%; }
  .col-lg-5 { flex: 0 0 41.667%; max-width: 41.667%; }
  .col-lg-6 { flex: 0 0 50%; max-width: 50%; }
  .col-lg-7 { flex: 0 0 58.333%; max-width: 58.333%; }
  .col-lg-8 { flex: 0 0 66.667%; max-width: 66.667%; }
  .col-lg-9 { flex: 0 0 75%; max-width: 75%; }
  .col-lg-10 { flex: 0 0 83.333%; max-width: 83.333%; }
  .col-lg-11 { flex: 0 0 91.667%; max-width: 91.667%; }
  .col-lg-12 { flex: 0 0 100%; max-width: 100%; }
}

/* Extra Large devices (≥1200px) */
@media (min-width: 1200px) {
  .col-xl-1 { flex: 0 0 8.333%; max-width: 8.333%; }
  .col-xl-2 { flex: 0 0 16.667%; max-width: 16.667%; }
  .col-xl-3 { flex: 0 0 25%; max-width: 25%; }
  .col-xl-4 { flex: 0 0 33.333%; max-width: 33.333%; }
  .col-xl-5 { flex: 0 0 41.667%; max-width: 41.667%; }
  .col-xl-6 { flex: 0 0 50%; max-width: 50%; }
  .col-xl-7 { flex: 0 0 58.333%; max-width: 58.333%; }
  .col-xl-8 { flex: 0 0 66.667%; max-width: 66.667%; }
  .col-xl-9 { flex: 0 0 75%; max-width: 75%; }
  .col-xl-10 { flex: 0 0 83.333%; max-width: 83.333%; }
  .col-xl-11 { flex: 0 0 91.667%; max-width: 91.667%; }
  .col-xl-12 { flex: 0 0 100%; max-width: 100%; }
}

/* Extra Extra Large devices (≥1400px) */
@media (min-width: 1400px) {
  .col-xxl-1 { flex: 0 0 8.333%; max-width: 8.333%; }
  .col-xxl-2 { flex: 0 0 16.667%; max-width: 16.667%; }
  .col-xxl-3 { flex: 0 0 25%; max-width: 25%; }
  .col-xxl-4 { flex: 0 0 33.333%; max-width: 33.333%; }
  .col-xxl-5 { flex: 0 0 41.667%; max-width: 41.667%; }
  .col-xxl-6 { flex: 0 0 50%; max-width: 50%; }
  .col-xxl-7 { flex: 0 0 58.333%; max-width: 58.333%; }
  .col-xxl-8 { flex: 0 0 66.667%; max-width: 66.667%; }
  .col-xxl-9 { flex: 0 0 75%; max-width: 75%; }
  .col-xxl-10 { flex: 0 0 83.333%; max-width: 83.333%; }
  .col-xxl-11 { flex: 0 0 91.667%; max-width: 91.667%; }
  .col-xxl-12 { flex: 0 0 100%; max-width: 100%; }
}

</style>
