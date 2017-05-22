package com.hrmsys.action;

import java.io.IOException;
import java.util.Date;

import com.hrmsys.bean.TrainBean;
import com.hrmsys.model.Train;
import com.hrmsys.model.User;
import com.hrmsys.service.TrainService;
import com.hrmsys.util.CurrentDate;

public class TrainAction extends BaseAction{
	private TrainService trainService;
	private TrainBean trainBean;
	private Train train;
	private String trainPerson;
	private String trainTitle;
	private String startDate;
	private String endDate;
	private String type;
	private String ids;
	private String trainId;
	private String page;
	private String rows;
	private String condition;
	
	public void list(){
		String jsonTRecord = null;
		jsonTRecord = trainService.list(page, rows);
		this.out(jsonTRecord);
	}
	
	public void save(){
		String msg = trainService.save(train);
		this.out("{\"success\": true, \"msg\":\""+ msg +"\"}");
	}
	
	public void delete(){
		String msg = trainService.delete(ids);
		this.out("{success: true, msg: '"+msg+"'}");
	}
	
	public void intoUpdate(){
		String trainJson = trainService.getTrainById(trainId);
		this.setTrainId(null);
		this.out(trainJson);
	}
	
	public void getAllInfo(){
		String json = trainService.list();
		this.out(json);
	}
	
	public void listByCondition(){
		String json = trainService.queryList(condition, page, rows);
		this.out(json);
	}
	
	/***********setter and getter******************/
	public TrainService getTrainService() {
		return trainService;
	}
	public void setTrainService(TrainService trainService) {
		this.trainService = trainService;
	}
	public TrainBean getTrainBean() {
		return trainBean;
	}
	public void setTrainBean(TrainBean trainBean) {
		this.trainBean = trainBean;
	}
	public String getTrainPerson() {
		return trainPerson;
	}
	public void setTrainPerson(String trainPerson) {
		this.trainPerson = trainPerson;
	}
	public String getTrainTitle() {
		return trainTitle;
	}
	public void setTrainTitle(String trainTitle) {
		this.trainTitle = trainTitle;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getIds() {
		return ids;
	}
	public void setIds(String ids) {
		this.ids = ids;
	}

	public Train getTrain() {
		return train;
	}

	public void setTrain(Train train) {
		this.train = train;
	}

	public String getTrainId() {
		return trainId;
	}

	public void setTrainId(String trainId) {
		this.trainId = trainId;
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
	
	public String getCondition() {
		return condition;
	}
	
	public void setCondition(String condition) {
		this.condition = condition;
	}

}
