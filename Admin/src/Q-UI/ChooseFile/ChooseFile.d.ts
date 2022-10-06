type res = {
    file: File
    /** read[]的某值为null时表示转换失败 */
    read: FileReader['result']
}