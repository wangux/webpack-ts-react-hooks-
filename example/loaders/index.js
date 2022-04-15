const CustomLoader = (content) => {
    if (this.cacheable) {
        this.cacheable();
    }
    return content.replace(/(\/\/ *@require) +(('|").+('|")).*/, 'import $2;');
}

module.exports = CustomLoader;
