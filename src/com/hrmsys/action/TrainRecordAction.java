package com.hrmsys.action;

import com.hrmsys.model.TrainRecord;
import com.hrmsys.service.TrainRecordService;

public class TrainRecordAction extends BaseAction{
	private TrainRecordService tRecordService;
	private TrainRecord trainRecord;
	private String ids;
	private String page;
	private String rows;
	private String condition;
	private String trainRecordId;
	
	public void list(){
		String jsonTRecord = null;
		jsonTRecord = tRecordService.list(page, rows);
		this.out(jsonTRecord);
	}
	
	public void listByCondition(){
		String jsonTRecord = null;
		jsonTRecord = tRecordService.queryList(condition, page, rows);
		this.out(jsonTRecord);
	}
	
	
	public void delete(){
		log.info("into delete TRecord...");
		String msg = tRecordService.delete(ids);
		this.out("{\"success\": true, \"msg\":\""+ msg +"\"}");
	}
	
	public void save(){
		String msg = null;
		msg = tRecordService.save(trainRecord);
		this.setTrainRecord(null);
		this.out("{\"success\": true, \"msg\":\""+ msg +"\"}");
	}
	
	public void edit(){
		String json = tRecordService.getTRecordById(trainRecordId);
		this.out(json);
	}
	
	
	/***setter and getter*********************/
	public TrainRecordService gettRecordService() {
		return tRecordService;
	}

	public void settRecordService(TrainRecordService tRecordService) {
		this.tRecordService = tRecordService;
	}

	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}


	public TrainRecord getTrainRecord() {
		return trainRecord;
	}

	public void setTrainRecord(TrainRecord trainRecord) {
		this.trainRecord = trainRecord;
	}

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getRows() {
		return rows;
	}

	public void setRows(String rows) {
		this.rows = rows;
	}

	public String getTrainRecordId() {
		return trainRecordId;
	}

	public void setTrainRecordId(String trainRecordId) {
		this.trainRecordId = trainRecordId;
	}
	
	public String getCondition() {
		return condition;
	}
	
	public void setCondition(String condition) {
		this.condition = condition;
	}
}
