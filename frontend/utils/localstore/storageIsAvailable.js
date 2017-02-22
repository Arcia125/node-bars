const storageIsAvailable = () => {
    // this method will return true if local storage can be used
    if (typeof localStorage !== `undefined`) {
        try {
            localStorage.setItem(`feature_test`, `yes`);
            if (localStorage.getItem(`feature_test`) === `yes`) {
                localStorage.removeItem(`feature_test`);
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    } else {
        return false;
    }
};

export default storageIsAvailable;
