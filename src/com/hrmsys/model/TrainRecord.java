package com.hrmsys.model;

import java.util.Date;

/**
 * TrainRecord entity. @author MyEclipse Persistence Tools
 */

public class TrainRecord implements java.io.Serializable {

	// Fields
	
	private Integer trecordId;
	private Train train;
	private String trainTitle;
	private String trainPerson;
	private String trecordTrainer;
	private String trecordEmp;
	private String trecordHR;
	private String trecordRemark;
	private String trecordAddPerson;
	private String trecordDate;

	// Constructors

	/** default constructor */
	public TrainRecord() {
	}
	
	/** minimal constructor */
	public TrainRecord(Integer trecordId, Train train, String trainPerson,
			String trecordTrainer, String trecordEmp, String trecordHR,
			String trecordAddPerson, String trecordDate, String trainTitle) {
		super();
		this.trecordId = trecordId;
		this.train = train;
		this.trainPerson = trainPerson;
		this.trecordTrainer = trecordTrainer;
		this.trecordEmp = trecordEmp;
		this.trecordHR = trecordHR;
		this.trecordAddPerson = trecordAddPerson;
		this.trecordDate = trecordDate;
		this.trainTitle = trainTitle;
	}

	
	/** full constructor */
	public TrainRecord(Integer trecordId, Train train, String trainPerson,
			String trecordTrainer, String trecordEmp, String trecordHR,
			String trecordRemark, String trecordAddPerson, String trecordDate,String trainTitle) {
		super();
		this.trecordId = trecordId;
		this.train = train;
		this.trainPerson = trainPerson;
		this.trecordTrainer = trecordTrainer;
		this.trecordEmp = trecordEmp;
		this.trecordHR = trecordHR;
		this.trecordRemark = trecordRemark;
		this.trecordAddPerson = trecordAddPerson;
		this.trecordDate = trecordDate;
		this.trainTitle = trainTitle;
	}


	/**
	 * setter getter Method
	 * @return
	 */
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
	
}