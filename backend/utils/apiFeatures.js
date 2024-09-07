class ApiFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }
  
    // Search functionality using arrow function
    search = () => {
      const keyword = this.queryStr.keyword
        ? {
            name: {
              $regex: this.queryStr.keyword,
              $options: 'i', // Case-insensitive search
            },
          }
        : {};
  
      this.query = this.query.find({ ...keyword });
      return this; // Allow method chaining
    };
  
    // Filtering functionality using arrow function
    filter = () => {
      // Copying the query parameters
      const queryParams = { ...this.queryStr };
  
      // Fields to exclude from filtering
      const excludedFields = ['keyword', 'page', 'limit'];
      excludedFields.forEach((field) => delete queryParams[field]);
  
      // Advanced filtering for price, rating, etc.
      let queryStr = JSON.stringify(queryParams);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
  
      this.query = this.query.find(JSON.parse(queryStr));
      return this; // Allow method chaining
    };
  
    // Pagination functionality using arrow function
    pagination = (resultsPerPage) => {
      const currentPage = Number(this.queryStr.page) || 1; // Default to the first page
      const skip = resultsPerPage * (currentPage - 1); // Records to skip
  
      this.query = this.query.limit(resultsPerPage).skip(skip);
      return this; // Allow method chaining
    };
  }
  
  export default ApiFeatures;
  