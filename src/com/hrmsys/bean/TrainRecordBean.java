package com.hrmsys.bean;

import java.util.Date;

import com.hrmsys.model.Train;

public class TrainRecordBean {
	private Integer trecordId;
	private Train train;
	private String trainPerson;
	private String trainTitle;
	private String trecordTrainer;
	private String trecordEmp;
	private String trecordHR;
	private String trecordRemark;
	private String trecordAddPerson;
	private String trecordDate;
	
	
	public TrainRecordBean() {
		super();
	}
	
	
	//setter/getter method
	public Integer getTrecordId() {
		return trecordId;
	}
	public void setTrecordId(Integer trecordId) {
		this.trecordId = trecordId;
	}
	public Train getTrain() {
		return train;
	}
	public void setTrain(Train train) {
		this.train = train;
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
	public String getTrecordTrainer() {
		return trecordTrainer;
	}
	public void setTrecordTrainer(String trecordTrainer) {
		this.trecordTrainer = trecordTrainer;
	}
	public String getTrecordEmp() {
		return trecordEmp;
	}
	public void setTrecordEmp(String trecordEmp) {
		this.trecordEmp = trecordEmp;
	}
	public String getTrecordHR() {
		return trecordHR;
	}
	public void setTrecordHR(String trecordHR) {
		this.trecordHR = trecordHR;
	}
	public String getTrecordRemark() {
		return trecordRemark;
	}
	public void setTrecordRemark(String trecordRemark) {
		this.trecordRemark = trecordRemark;
	}
	public String getTrecordAddPerson() {
		return trecordAddPerson;
	}
	public void setTrecordAddPerson(String trecordAddPerson) {
		this.trecordAddPerson = trecordAddPerson;
	}
	public String getTrecordDate() {
		return trecordDate;
	}
	public void setTrecordDate(String trecordDate) {
		this.trecordDate = trecordDate;
	}
	
	
	

}
