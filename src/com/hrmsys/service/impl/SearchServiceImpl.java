package com.hrmsys.service.impl;

import java.util.List;

import net.sf.json.JSONArray;

import com.hrmsys.dao.SearchDao;
import com.hrmsys.service.SearchService;

public class SearchServiceImpl implements SearchService{
	private SearchDao searchDao;
	
	@Override
	public String queryByParam(String param, Class clazz) {
		// TODO Auto-generated method stub
		List obj = searchDao.queryByParam(param, clazz); 
		return JSONArray.fromObject(obj).toString();
	}
	
	public SearchDao getSearchDao() {
		return searchDao;
	}
	
	public void setSearchDao(SearchDao searchDao) {
		this.searchDao = searchDao;
	}
}
