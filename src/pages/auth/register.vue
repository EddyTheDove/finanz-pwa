<template lang="html">
    <div class="page">
        <div class="_auth">
            <div class="box-container">
                <div class="box-header">
                    Sign Up
                </div>

                <div class="box-content mt-20">
                    <form class="_form" @submit.prevent="authenticate('register')">
                        <div class="_form-group mt-10">
                            <div class="inner-addon left-addon">
                                <i class="glyphicon ion-android-mail"></i>
                                <input type="email"
                                    class="_form-material bold"
                                    placeholder="Email *"
                                    name="email"
                                    v-validate="'required|email'"
                                    v-model="ghost.email">
                            </div>
                            <span class="_form-error" v-show="errors.has('email')">{{ errors.first('email') }}</span>
                        </div>

                        <div class="_form-group mt-20">
                            <div class="inner-addon left-addon">
                                <i class="glyphicon ion-android-person"></i>
                                <input type="text"
                                    class="_form-material bold"
                                    placeholder="Preferred name"
                                    v-model="ghost.firstname">
                            </div>
                        </div>

                        <div class="_form-group mt-20">
                            <div class="inner-addon left-addon">
                                <i class="glyphicon ion-ios-locked"></i>
                                <input type="password"
                                    class="_form-material bold"
                                    placeholder="Password *"
                                    name="password"
                                    v-validate="'required|min:4|confirmed:confirm'"
                                    v-model="ghost.password">
                            </div>
                            <span class="_form-error" v-show="errors.has('password')">{{ errors.first('password') }} <br></span>
                        </div>

                        <div class="_form-group mt-20">
                            <div class="inner-addon left-addon">
                                <i class="glyphicon ion-ios-locked"></i>
                                <input type="password"
                                    class="_form-material bold"
                                    placeholder="Confirm Password *"
                                    name="confirm"
                                    v-model="ghost.confirm">
                            </div>
                        </div>


                        <div class="_error" v-if="errorMessage">
                            {{ errorMessage }}
                        </div>

                        <div class="mt-30 text-center">
                            <button class="btn btn-info btn-lg elevated w-200 bold"
                                :disabled="isLoading">
                                <span v-show="!isLoading">Sign Up</span>
                                <span v-show="isLoading">Loading...</span>
                            </button>
                        </div>
                    </form>
                    <!-- End of form  -->

                    <div class="_links">
                        <button class="btn btn-link bold fs-18" @click="goto('login')">
                            Sign In
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
    name: 'registerPage',
    mixins: [authMixins]
}
</script>
