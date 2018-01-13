<template lang="html">
    <div class="page">
        <div class="_auth">
            <div class="box-container">
                <div class="box-header">
                    Log In
                </div>

                <div class="box-content mt-20">
                    <form class="_form" @submit.prevent="authenticate('login')">
                        <div class="_form-group mt-10">
                            <div class="inner-addon left-addon">
                                <i class="glyphicon ion-android-person"></i>
                                <input type="email"
                                    class="_form-material bold"
                                    placeholder="Email"
                                    name="email"
                                    v-validate="'required|email'"
                                    v-model="ghost.email">
                            </div>
                            <span class="_form-error" v-show="errors.has('email')">{{ errors.first('email') }}</span>
                        </div>

                        <div class="_form-group mt-40">
                            <div class="inner-addon left-addon">
                                <i class="glyphicon ion-ios-locked"></i>
                                <input type="password"
                                    class="_form-material bold"
                                    placeholder="Password"
                                    v-model="ghost.password">
                            </div>
                        </div>

                        <div class="_error" v-if="errorMessage">
                            {{ errorMessage }}
                        </div>


                        <div class="mt-60 text-center">
                            <button class="btn btn-info btn-lg elevated w-200 bold"
                                :disabled="isLoading">
                                <span v-show="!isLoading">Sign In</span>
                                <span v-show="isLoading">Loading...</span>
                            </button>
                        </div>
                    </form>

                    <div class="_links">
                        <button class="btn btn-link bold fs-18">
                            Forgot password?
                        </button>
                        <br>
                        <button class="btn btn-link bold fs-18" @click="goto('register')">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import authMixins from './mixins'

export default {
    name: 'loginPage',
    mixins: [authMixins]
}
</script>
