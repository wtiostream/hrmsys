package com.hrmsys.service.impl;


import net.sf.json.JSONArray;

import com.hrmsys.bean.PageBean;
import com.hrmsys.bean.TrainRecordBean;
import com.hrmsys.dao.TrainRecordDAO;
import com.hrmsys.enums.StaticValue;
import com.hrmsys.model.TrainRecord;
import com.hrmsys.service.TrainRecordService;

public class TrainRecordServiceImpl implements TrainRecordService{
	private TrainRecordDAO tRecordDAO;

	@Override
	public String list(String start, String limit) {
		PageBean pageBean = tRecordDAO.findAll(start, limit);
		String jsonTRecord = JSONArray.fromObject(pageBean.getRoot()).toString();
		return "{\"total\":" + pageBean.getTotalProperty() + ",\"rows\":" + jsonTRecord + "}";
	}
	
	@Override
	public String queryList(String condition, String start, String limit) {
		PageBean pageBean = tRecordDAO.findAllByCondition(condition, Integer.parseInt(start), Integer.parseInt(limit));
		String tRecordJson = JSONArray.fromObject(pageBean.getRoot()).toString();
		return "{\"total\":" + pageBean.getTotalProperty() + ",\"rows\":" + tRecordJson + "}";
	}
	
	@Override
	public String delete(String ids) {
		String[] tRecordIds = ids.split(",");
		if(tRecordDAO.delete(tRecordIds)) 
			return StaticValue.DELETE_SUCCESS;
		return StaticValue.DELETE_FAILURE;
	}
	
	@Override
	public String save(TrainRecord tRecord) {
		if(tRecordDAO.saveOrUpdate(tRecord)){
			return StaticValue.SAVE_SUCCESS;
		}
		return StaticValue.SAVE_FAILURE;
	}
	
	@Override
	public String getTRecordById(String tRecordId) {
		TrainRecord trainRecord = tRecordDAO.findById(Integer.parseInt(tRecordId));
		return JSONArray.fromObject(trainRecord).toString();
	}
	
	@Override
	public String update(TrainRecord trainRecord) {
		if(tRecordDAO.update(trainRecord)){
			return StaticValue.UPDATE_SUCCESS;
		}
		return StaticValue.UPDATE_FAILURE;
	}
	
	// set/get method 
	public TrainRecordDAO gettRecordDAO() {
		return tRecordDAO;
	}

	public void settRecordDAO(TrainRecordDAO tRecordDAO) {
		this.tRecordDAO = tRecordDAO;
	}

}
